let mongoose = require("../connect"),
  schemas = require("../models"),
  errorHandler = require("../errorHandler"),

  country = require("./countryActions"),
  productTypes = require("./productTypeActions"),
  goods = require("./goodsActions"),
  goodsImage = require("./goodsImageActions");

module.exports = {
  country,
  productTypes,
  goods,
  goodsImage
};