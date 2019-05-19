let express = require("express"),
  router = express.Router(),
  mongo = require("../logic/mongodb/API"),
  config = require("../config"),
  answerGenerator = require("../logic/modules/answerGenerator"),
  multer = require("multer"),
  upload = multer(),
  Product = require("../logic/class/Product"),

  Validator = require("../logic/validator"),
  idValidator = new Validator({
    id: ["require"]
  }),
  favoriteValidator = new Validator({
    id: ["require"],
    location: ["require"]
  });

router.all("*", function (req, res, next) {
  next();
});

router.post("/", function (req, res, next) {
  let data = req.body;

  return mongo.goods.getProducts(data)
    .then(result => {
      res.send(answerGenerator(null, result));
    }, error => {
      res.send(answerGenerator(error))
    });
});

router.post("/get", function (req, res, next) {
  let data = req.body,
    validationErrors = idValidator.validate(data);

  if (Object.keys(validationErrors).length !== 0)
    return Promise.resolve(answerGenerator.error.requireData());

  return mongo.goods.getProduct({ _id: data.id })
    .then(result => {
      res.send(answerGenerator(null, result));
    }, error => {
      res.send(answerGenerator(error))
    });
});

router.post("/create", upload.single("image"), function (req, res, next) {
  let product = new Product({ ...req.body, image: req.file });

  return product.setProduct(req)
    .then(result => res.send(result))
    .catch(error => res.send(error));
});

router.post("/update", upload.single("image"), function (req, res, next) {
  let product = new Product({ ...req.body, image: req.file });

  return product.updateProduct(req)
    .then(result => res.send(result))
    .catch(error => res.send(error));
});

router.post("/delete", function (req, res, next) {
  let product = new Product({ _id: req.body.id });

  product.delete(req)
    .then(result => res.send(result))
});

module.exports = router;