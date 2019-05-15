let express = require("express"),
  router = express.Router(),
  mongo = require("../logic/mongodb/API"),
  config = require("../config"),
  answerGenerator = require("../logic/modules/answerGenerator"),
  Validator = require("../logic/validator");

router.all("*", function (req, res, next) {
  next();
});

router.post("/", function (req, res, next) {
  return mongo.country.getCountries()
    .then(result => {
      res.send(answerGenerator(null, result));
    }, error => {
      res.send(answerGenerator(error))
    });
});

module.exports = router;