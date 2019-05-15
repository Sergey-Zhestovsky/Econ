let mongoose = require("../connect"),
  schemas = require("../models"),
  errorHandler = require("../errorHandler");

async function getCountries() {
  let countries;

  try {
    countries = await schemas.Country.find();
  } catch (error) {
    return Promise.reject(errorHandler("getCountries", error));
  }

  return countries;
}

module.exports = {
  getCountries
};