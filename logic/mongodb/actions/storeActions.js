let mongoose = require("../connect"),
  schemas = require("../models"),
  errorHandler = require("../errorHandler");

async function getStores() {
  let stores;

  try {
    stores = await schemas.Store.find();
  } catch (error) {
    return Promise.reject(errorHandler("getStores", error));
  }

  return stores;
}

module.exports = {
  getStores
};