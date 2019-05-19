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

async function getCountry(data) {
  let country;

  try {
    country = await schemas.Country.findOne(data);
  } catch (error) {
    return Promise.reject(errorHandler("getCountry", error));
  }

  return country;
}

module.exports = {
  getCountries,
  getCountry
};