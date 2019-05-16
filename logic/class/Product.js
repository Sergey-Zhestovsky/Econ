let mongo = require("../mongodb/API"),
  config = require("../../config"),
  answerGenerator = require("../modules/answerGenerator"),
  fs = require("fs").promises,

  Validator = require("../validator"),
  createProductRule = require("../validator/forms/createProduct").rule(),
  createProjectValidator = new Validator(createProductRule),
  editProductRule = require("../validator/forms/editProduct").rule(),
  editProjectValidator = new Validator(editProductRule);


class Product {
  constructor({ _id, name, country, productType, company, image, price, discount, store, location, date }) {
    this._id = _id;
    this.name = name;
    this.country = country;
    this.productType = productType;
    this.company = company;
    this.price = price;
    this.discount = discount;
    this.store = store;
    this.location = location && JSON.parse(location) || undefined;
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
    };

    if (!this._id)
      delete temp._id;

    if (!this.image)
      delete temp.image;

    return temp;
  }

  setProduct(req) {
    let product = this.Product,
      validationErrors = createProjectValidator.validate(product);

    if (Object.keys(validationErrors).length !== 0)
      return Promise.resolve(answerGenerator.error.requireData());

    return mongo.createProduct(product)
      .then((result) => {
        if (product.image) {
          let relPath = config.imageStorage.product,
            filePath = `${req.app.get("dir")}${relPath}${result.image}`;

          return fs.writeFile(filePath, product.image.buffer)
            .then(() => result)
            .catch((error) => { throw error; })
        } else {
          return Promise.resolve(result);
        }
      }, (error) => {
        return answerGenerator(error);
      })
      .then((result) => {
        return answerGenerator(null, result);
      }, (error) => {
        return answerGenerator(error);
      });
  }

  async updateProduct(req) {
    let product = this.Product,
      sourcePath, editResult,
      validationErrors = editProjectValidator.validate(product);

    if (Object.keys(validationErrors).length !== 0)
      return Promise.resolve(answerGenerator.error.requireData());

    delete product.date;

    try {
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
}

module.exports = Product;