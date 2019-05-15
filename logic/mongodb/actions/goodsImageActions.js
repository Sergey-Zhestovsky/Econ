let mongoose = require("../connect"),
  schemas = require("../models"),
  errorHandler = require("../errorHandler");

async function setImage({ buffer, ...data }) {
  let image = new schemas.GoodsImage(data),
    responce;

  try {
    responce = await image.save();
  } catch (error) {
    return Promise.reject(errorHandler("setImage", error));
  }

  return responce;
}

module.exports = {
  setImage
};