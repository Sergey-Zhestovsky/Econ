let mongoose = require("../connect"),
  schemas = require("../models"),
  errorHandler = require("../errorHandler");

async function setUser(data) {
  let user = new schemas.User(data),
    responce;

  try {
    let userIsExisted = await getUser({ email: data.email });

    if (userIsExisted)
      return Promise.reject(errorHandler("setUser", { code: "custom002" }));

    responce = await user.save();
    responce = await getPublicUserData(responce._id);
  } catch (error) {

    return Promise.reject(errorHandler("setUser", error));
  }

  return responce;
}

async function getUser(data) {
  let user;

  try {
    user = await schemas.User.findOne(data);
  } catch (error) {
    return Promise.reject(errorHandler("getUser", error));
  }

  return user;
}

async function authorizeUser({ email, password }) {
  let user;

  try {
    user = await getUser({ email });

    if (!user)
      return Promise.reject(errorHandler("authorizeUser", { code: "custom001" }));

    user = new schemas.User(user);

    if (user.checkPassword(password))
      return await getPublicUserData(user._id);

    return Promise.reject(errorHandler("authorizeUser", { code: "custom001" }));
  } catch (error) {
    return Promise.reject(errorHandler("authorizeUser", error));
  }

  return user;
}

async function getPublicUserData(id) {
  let user;

  try {

    user = await schemas.User.aggregate([{
      $match: { _id: new mongoose.Types.ObjectId(id) }
    }, {
      $lookup: {
        from: 'privileges',
        localField: 'privilege',
        foreignField: '_id',
        as: 'privilege'
      }
    }, {
      $unwind: {
        path: "$privilege",
        preserveNullAndEmptyArrays: true
      }
    }, {
      $project: { fullName: 1, email: 1, privilege: 1 }
    }]);

    if (user.length > 0)
      return user[0];

    return Promise.reject(errorHandler("getPublicUserData", { code: "custom003" }));
  } catch (error) {
    return Promise.reject(errorHandler("getPublicUserData", error));
  }

  return user;
}

module.exports = {
  setUser,
  getUser,
  authorizeUser,
  getPublicUserData
};