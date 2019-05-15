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

module.exports = {
  getTypes
};