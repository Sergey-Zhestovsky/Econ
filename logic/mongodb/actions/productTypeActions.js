let mongoose = require("../connect"),
  schemas = require("../models"),
  errorHandler = require("../errorHandler");

async function getTypes() {
  let types;

  try {
    types = await schemas.ProductType.find();
  } catch (error) {
    return Promise.reject(errorHandler("getTypes", error));
  }

  return types;
}

async function getType(data) {
  let type;

  try {
    type = await schemas.ProductType.findOne(data);
  } catch (error) {
    return Promise.reject(errorHandler("getType", error));
  }

  return type;
}

module.exports = {
  getTypes,
  getType
};