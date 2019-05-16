module.exports = {
  titleMaxSize: 50,
  messageMaxSize: 5000,
  imageMaxSize: 20000000,
  imageType: /^image\/*/,
  rule() {
    return {
      name: ["required", ["maxSize", this.titleMaxSize]],
      productType: ["required"],
      country: ["required"],
      company: ["required", ["maxSize", this.titleMaxSize]],
      price: ["required", "number"],
      discount: ["number"],
      image: {
        property: ["mimetype", "size"],
        rules: [
          ["test", this.imageType, "imageType"],
          ["larger", this.imageMaxSize, "imageSize"]
        ]
      },
      store: ["required"],
      location: ["required"]
    }
  }
};