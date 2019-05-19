let mongoose = require("mongoose"),
  crypto = require("crypto"),
  Schema = mongoose.Schema;

require("mongoose-long")(mongoose);

let coordinatesSchema = new Schema({
  x: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  y: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  }
}, { versionKey: false });

let goodsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  productType: {
    type: Schema.Types.ObjectId,
    required: true
  },
  company: {
    type: String,
    default: null
  },
  country: {
    type: Schema.Types.ObjectId,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: null,
    min: 0,
    max: 100
  },
  image: {
    type: Schema.Types.ObjectId,
    required: true
  },
  store: {
    type: Schema.Types.ObjectId,
    required: true
  },
  location: {
    type: coordinatesSchema,
    required: true
  },
  addCounter: {
    type: Schema.Types.Long,
    min: 0, 
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  date: {
    type: Number,
    default: Date.now
  }
}, { versionKey: false });

let goodsImageSchema = new Schema({
  extension: {
    type: String,
    required: true
  },
  originalname: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  }
}, { versionKey: false });

let productTypeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  }
}, { versionKey: false });

let countrySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  }
}, { versionKey: false });

let storeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
}, { versionKey: false });

let privrlegeSchema = new Schema({
  type: Number,
  name: String
}, { versionKey: false });

let userSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  privilege: {
    type: Schema.Types.ObjectId,
    default: null
  },
  userPassword: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  }
}, { versionKey: false });

userSchema.virtual("password")
  .set(function (pass) {
    this.salt = crypto.randomBytes(10).toString('hex');
    this.userPassword = this.encryptPassword(pass)
  })
  .get(() => this.userPassword)

userSchema.methods.encryptPassword = function (password) {
  return crypto.createHmac('sha256', this.salt).update(password).digest('hex');
}
userSchema.methods.checkPassword = function (password) {
  return this.encryptPassword(password) === this.userPassword;
}

module.exports = {
  goodsSchema,
  goodsImageSchema,
  productTypeSchema,
  countrySchema,
  storeSchema,
  privrlegeSchema,
  userSchema
}