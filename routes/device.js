let express = require("express"),
  router = express.Router(),
  mongo = require("../logic/mongodb/API"),
  config = require("../config"),
  answerGenerator = require("../logic/modules/answerGenerator"),
  Product = require("../logic/class/Product"),

  Validator = require("../logic/validator"),
  showListValidator = new Validator({
    length: ["require"]
  }),
  setListValidator = new Validator({
    _id: ["require"],
    amount: ["require"]
  });

router.all("*", function (req, res, next) {
  next();
});

router.post("/list", function (req, res, next) {
  let data = req.body,
    validationErrors;

  validationErrors = showListValidator.validate(data);

  if (Object.keys(validationErrors).length !== 0)
    return res.send(answerGenerator.error.requireData());

  return mongo.goods.getProducts(data)
    .then(result => {
      res.send(answerGenerator(null, result));
    }, error => {
      res.send(answerGenerator(error))
    });
});

router.post("/set", function (req, res, next) {
  let data = req.body,
    validationErrors,
    socketIo = req.app.get("socketServet");

  validationErrors = setListValidator.validate(data);

  if (Object.keys(validationErrors).length !== 0)
    return res.send(answerGenerator.error.requireData());

  return Product.source(data._id)
    .then(product => {
      socketIo.emit("favorite", { id: product._id, location: product.location });
      return product.addFavorite(data.amount);
    })
    .then(response => res.send(answerGenerator(null, response)))
    .catch(error => res.send(answerGenerator(error)));
});

router.post("/auto", function (req, res, next) {
  let socketIo = req.app.get("socketServet");

  return mongo.goods.getSample()
    .then(result => Product.source(result[0]._id))
    .then(product => {
      socketIo.emit("favorite", { id: product._id, location: product.location });
      return product.addFavorite();
    })
    .then(response => res.send(answerGenerator(null, response)))
    .catch(error => res.send(answerGenerator(error)));
});

module.exports = router;