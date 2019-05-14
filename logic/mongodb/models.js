let mongoose = require("mongoose"),
  schemas = require("./schemas");

module.exports = {
  Goods: mongoose.model('Goods', schemas.goodsSchema),
  GoodsImage: mongoose.model('GoodsImage', schemas.goodsImageSchema),
  ProductType: mongoose.model('ProductType', schemas.productTypeSchema),
  Country: mongoose.model('Country', schemas.countrySchema),
  Storage: mongoose.model('Storage', schemas.storageSchema),
  Privrlege: mongoose.model('Privrlege', schemas.privrlegeSchema),
  User: mongoose.model('User', schemas.userSchema)
}