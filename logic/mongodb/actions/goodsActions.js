let mongoose = require("../connect"),
  schemas = require("../models"),
  errorHandler = require("../errorHandler");

async function getProducts({ searchDetails = {}, length = -1, sortedBy = "date" } = {}) {
  let goods, dbLength;

  try {
    dbLength = await schemas.Goods.countDocuments();
    length = ~length ? length : dbLength;

    goods = await schemas.Goods.aggregate([{
      $match: searchDetails
    }, {
      $sort: { [sortedBy]: -1 }
    }, {
      $lookup: {
        from: 'producttypes',
        localField: 'productType',
        foreignField: '_id',
        as: 'productType'
      }
    }, {
      $unwind: {
        path: "$productType",
        preserveNullAndEmptyArrays: true
      }
    }, {
      $lookup: {
        from: 'countries',
        localField: 'country',
        foreignField: '_id',
        as: 'country'
      }
    }, {
      $unwind: {
        path: "$country",
        preserveNullAndEmptyArrays: true
      }
    }, {
      $lookup: {
        from: 'goodsimages',
        localField: 'image',
        foreignField: '_id',
        as: 'image'
      }
    }, {
      $unwind: {
        path: "$image",
        preserveNullAndEmptyArrays: true
      }
    }, {
      $lookup: {
        from: 'stores',
        localField: 'store',
        foreignField: '_id',
        as: 'store'
      }
    }, {
      $unwind: {
        path: "$store",
        preserveNullAndEmptyArrays: true
      }
    }]);
  } catch (error) {
    return Promise.reject(errorHandler("getGoods", error));
  }
  
  return goods;
}

async function getProduct(searchDetails = {}) {
  let product;

  searchDetails._id = searchDetails._id
    ? new mongoose.Types.ObjectId(searchDetails._id)
    : undefined;

  try {
    product = await getProducts({ searchDetails });
  } catch (error) {
    return Promise.reject(errorHandler("getProduct", error));
  }

  return product[0];
}

async function setProduct(data) {
  let product = new schemas.Goods(data),
    responce;

  try {
    responce = await product.save();
  } catch (error) {
    return Promise.reject(errorHandler("setProduct", error));
  }

  return responce;
}

module.exports = {
  getProducts,
  getProduct,
  setProduct
};