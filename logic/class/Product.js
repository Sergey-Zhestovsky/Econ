let mongo = require("../mongodb/API"),
  config = require("../../config"),
  answerGenerator = require("../modules/answerGenerator"),
  fs = require("fs").promises,

  Validator = require("../validator"),
  createProductRule = require("../validator/forms/createProduct").rule(),
  createProjectValidator = new Validator(createProductRule),
  editProductRule = require("../validator/forms/editProduct").rule(),
  editProjectValidator = new Validator(editProductRule);

const RATING_COEFFICIENT = {
  country: 1,
  productType: 0.3,
  addCounter: 0.8,
  discount: 0.25
};

class Product {
  constructor({ _id, name, country, productType, company, image, price, discount, store, location, date, rating, addCounter }) {
    this._id = _id;
    this.name = name;
    this.country = country;
    this.productType = productType;
    this.company = company;
    this.price = price;
    this.discount = discount;
    this.store = store;
    this.location = location && JSON.parse(location) || undefined;
    this.rating = rating || 0;
    this.addCounter = addCounter || 0;
    this.date = date;

    if (image) {
      this.image = {
        ...image,
        extension: image.originalname.replace(/^.+\.(\w+)$/i, "$1"),
        originalname: image.originalname.replace(/^(.+)\.(\w+)$/i, "$1"),
      };
    }
  }

  get Product() {
    let temp = {
      _id: this._id,
      name: this.name,
      country: this.country,
      productType: this.productType,
      company: this.company,
      price: this.price,
      discount: this.discount,
      store: this.store,
      location: this.location,
      date: this.date,
      image: this.image,
      rating: this.rating,
      addCounter: this.addCounter
    };

    if (!this._id)
      delete temp._id;

    if (!this.image)
      delete temp.image;

    return temp;
  }

  static async source(_id) {
    let product, response;

    try {
      product = await mongo.goods.getProduct({ _id });
      product.country = product.country._id;
      product.productType = product.productType._id;
      product.store = product.store._id;
      product.location = JSON.stringify({ x: product.location.x, y: product.location.y });
      delete product.image;

      response = new this(product);
    } catch (error) { 
      return Promise.reject(error);
     }

    return response;
  }

  async setRating() {
    let type, country, rating = 0;

    try {
      [type, country] = await mongo.getStatisticSource(this.Product);
      rating += type.rating * RATING_COEFFICIENT.productType;
      rating += country.rating * RATING_COEFFICIENT.country;
      rating += this.discount * RATING_COEFFICIENT.discount;

      if (this.addCounter)
        rating += Math.log(this.addCounter) * RATING_COEFFICIENT.addCounter;

      rating = ((rating * 100) | 0) / 100;
      this.rating = rating;
    } catch (error) {
      return Promise.reject(error);
    }

    return rating;
  }

  async setProduct(req) {
    let product = this.Product,
      createResult,
      validationErrors = createProjectValidator.validate(product);

    if (Object.keys(validationErrors).length !== 0)
      return Promise.resolve(answerGenerator.error.requireData());

    try {
      product.rating = await this.setRating();
      createResult = await mongo.createProduct(product);

      if (product.image) {
        let relPath = config.imageStorage.product,
          filePath = `${req.app.get("dir")}${relPath}${result.image}`;

        await fs.writeFile(filePath, product.image.buffer);
      }
    } catch (error) {
      return answerGenerator(error);
    }


    return answerGenerator(null, createResult);
  }

  async updateProduct(req) {
    let product = this.Product,
      sourcePath, editResult,
      validationErrors = editProjectValidator.validate(product);

    if (Object.keys(validationErrors).length !== 0)
      return Promise.resolve(answerGenerator.error.requireData());

    delete product.date;

    try {
      product.rating = await this.setRating();
      sourcePath = await mongo.goods.getProduct({ _id: product._id });
      editResult = await mongo.editProduct({ ...product });

      if (product.image) {
        let relPath = `${req.app.get("dir")}${config.imageStorage.product}`,
          filePath = relPath + editResult.image;

        await fs.unlink(relPath + sourcePath.image);
        await fs.writeFile(filePath, product.image.buffer);
      }

    } catch (error) {
      return answerGenerator(error);
    }

    return answerGenerator(null, editResult);
  }

  async delete(req) {
    let id = this._id,
      result, image,
      relPath = `${req.app.get("dir")}${config.imageStorage.product}`;

    try {
      image = await mongo.goods.getProduct({ _id: id });
      result = await mongo.deleteProduct(id);
      await fs.unlink(relPath + image.image);
    } catch (error) {
      return answerGenerator(error);
    }
    return answerGenerator(null, result);
  }

  async addFavorite(amount = 1) {
    let rating, response;

    this.addCounter += 1;

    try {
      rating = await this.setRating();
      response = await mongo.goods.addFavorite({
        _id: this._id,
        rating,
        amount
      });
    } catch (error) { console.log(error) }

    return response;
  }
}

module.exports = Product;