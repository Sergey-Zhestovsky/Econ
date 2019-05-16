let express = require("express"),
  router = express.Router(),
  mongo = require("../logic/mongodb/API"),
  config = require("../config"),
  answerGenerator = require("../logic/modules/answerGenerator"),
  multer = require("multer"),
  upload = multer(),
  Product = require("../logic/class/Product"),
  Validator = require("../logic/validator"),
  deleteValidator = new Validator({
    id: ["require"]
  });

router.all("*", function (req, res, next) {
  next();
});

router.post("/", function (req, res, next) {
  return mongo.goods.getProducts()
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
    .catch(error => res.send(answerGenerator(error)));
});

router.post("/update", upload.single("image"), function (req, res, next) {
  let product = new Product({ ...req.body, image: req.file });

  return product.updateProduct(req)
    .then(result => res.send(result))
    .catch(error => res.send(answerGenerator(error)));
});

router.post("/delete", function (req, res, next) {
  console.log(req.body)
  let product = new Product({_id: req.body.id});
  
  product.delete(req)
    .then(result => res.send(result))
});

module.exports = router;