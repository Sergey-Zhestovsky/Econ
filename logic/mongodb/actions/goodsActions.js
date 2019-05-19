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
      $sort: { [sortedBy]: 1 }
    },
    {
      $limit: length
    },
    {
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
    }, {
      $addFields: {
        image: { $concat: [{ $toString: "$image._id" }, ".", "$image.extension"] }
      }
    }]);
  } catch (error) {
    return Promise.reject(errorHandler("getGoods", error));
  }

  return goods;
}

async function getProduct(searchDetails = {}) {
  let product;

  try {
    searchDetails._id = searchDetails._id
      ? new mongoose.Types.ObjectId(searchDetails._id)
      : undefined;

    product = await getProducts({ searchDetails });

    if (product.length === 0)
      return Promise.reject(errorHandler("getProduct", { code: "custom010" }));
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

async function editProduct(data) {
  let responce;

  try {
    responce = await schemas.Goods.findByIdAndUpdate(data._id, data);
    responce = await getProduct({ _id: data._id });
  } catch (error) {
    return Promise.reject(errorHandler("editProduct", error));
  }

  return responce;
}

async function deleteProduct(id) {
  let responce;

  try {
    responce = await schemas.Goods.findByIdAndDelete(id);
  } catch (error) {
    return Promise.reject(errorHandler("deleteProduct", error));
  }

  return responce;
}

async function getProductImage(searchDetails = {}) {
  let image;

  searchDetails._id = searchDetails._id
    ? new mongoose.Types.ObjectId(searchDetails._id)
    : undefined;

  try {
    image = await schemas.Goods.aggregate([{
      $match: searchDetails
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
    }]);
  } catch (error) {
    return Promise.reject(errorHandler("getProductImage", error));
  }

  return image[0].image;
}

async function addFavorite({ _id, rating, amount = 1 } = {}) {
  let response;

  try {
    response = await schemas.Goods.updateOne(
      { _id },
      {
        $set: { rating },
        $inc: { addCounter: amount }
      }
    );
  } catch (error) {
    return Promise.reject(errorHandler("addFavorite", error));
  }

  return response;
}

async function getSample(length = 1) {
  let goods;

  try {
    goods = await schemas.Goods.aggregate([
      {
        $sort: { "date": 1 }
      },
      {
        $sample: { size: length }
      }]);
  } catch (error) {
    return Promise.reject(errorHandler("getSample", error));
  }

  return goods;
}


module.exports = {
  getProducts,
  getProduct,
  setProduct,
  editProduct,
  getProductImage,
  deleteProduct,
  addFavorite,
  getSample
};