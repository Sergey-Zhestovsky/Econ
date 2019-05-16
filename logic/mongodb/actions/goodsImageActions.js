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

async function editImage(id, { buffer, ...data }) {
  let responce;

  try {
    responce = await schemas.GoodsImage.findByIdAndUpdate(id, data)
  } catch (error) {
    return Promise.reject(errorHandler("editImage", error));
  }

  return responce;
}

async function deleteImage(id) {
  let responce;

  try {
    responce = await schemas.GoodsImage.findByIdAndDelete(id);
  } catch (error) {
    return Promise.reject(errorHandler("deleteImage", error));
  }

  return responce;
}

module.exports = {
  setImage,
  editImage,
  deleteImage
};