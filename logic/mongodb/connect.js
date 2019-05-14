let mongoose = require("mongoose"),
  schemas = require("./models"),
  config = require("../../config");

mongoose.connect(config.mongoDB_connect.uri, config.mongoDB_connect.options)
  .then(setCollections,
    error => {
      console.error(error);
    }
  );

async function setCollections() {
  try {
    for (let shema in schemas) {
      await schemas[shema].createCollection();
    }
  } catch (error) {
    return Promise.reject(error);
  }

  return;
}

module.exports = mongoose;