let mongoose = require("../connect"),
  schemas = require("../models"),
  errorHandler = require("../errorHandler"),

  country = require("./countryActions"),
  productTypes = require("./productTypeActions"),
  goods = require("./goodsActions"),
  store = require("./storeActions"),
  goodsImage = require("./goodsImageActions"),
  user = require("./userActions");

async function createProduct(data = {}) {
  let image = {}, product, result;

  try {
    if (data.image)
      image = await goodsImage.setImage(data.image);

    product = await goods.setProduct({
      ...data,
      image: image._id,
    });
    
    result = await goods.getProduct(product);
  } catch (error) {
    await schemas.GoodsImage.findByIdAndRemove(image._id);
    await schemas.Goods.findByIdAndRemove(product._id);

    if (error.source)
      return Promise.reject(error);

    return Promise.reject(errorHandler("createProduct", error));
  }

  return result;
}

async function editProduct(data = {}) {
  let image, productImage, result;

  try {
    if (data.image) {
      productImage = await goods.getProductImage({_id: data._id});
      image = await goodsImage.editImage(productImage._id, data.image);

      delete data.image;
    }

    result = await goods.editProduct(data);
  } catch (error) {
    if (error.source)
      return Promise.reject(error);

    return Promise.reject(errorHandler("editProduct", error));
  }

  return result;
}

async function deleteProduct(id) {
  let productImage, result;

  try {
    productImage = await goods.getProductImage({_id: id});
    await goodsImage.deleteImage(productImage._id);
    result = await goods.deleteProduct(id);
  } catch (error) {
    if (error.source)
      return Promise.reject(error);

    return Promise.reject(errorHandler("deleteProduct", error));
  }

  return result;
}

async function getStatisticSource(product) {
  let typeData, countryData;

  try {
    typeData = await productTypes.getType({_id: product.productType});
    countryData = await country.getCountry({_id: product.country});
  } catch (error) {
    if (error.source)
      return Promise.reject(error);

    return Promise.reject(errorHandler("getStatisticSource", error));
  }

  return [typeData, countryData];
}

module.exports = {
  country,
  productTypes,
  goods,
  goodsImage,
  store,
  user,

  createProduct,
  editProduct,
  deleteProduct,
  getStatisticSource
};