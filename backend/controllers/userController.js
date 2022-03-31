const userModel = require("../models/user");
const passwordHashingUtils = require("../utils/passwordHashingUtils");

async function registerUser({ 
  fullName,
  username,
  email,
  password,
  },
  profileImage="",
  res) {

  if (!(fullName, username, email, password)) {
    return res.sendStatus(406);
  }

  const { 
    passwordHashed, 
    passwordSalt } = await passwordHashingUtils.hashPassword(password);

  const UserModelObject = {
    full_name: fullName,
    username: username,
    email: email,
    password: passwordHashed,
    passwordSalt: passwordSalt,
    profile_image: profileImage,
    banner_image: ""
  }

  await userModel.insertMany([UserModelObject]).then(() => {




    return res.sendStatus(200);
  }).catch((err) => {
    if (err.code == 11000) {
      return res.sendStatus(409)
    }

    return res.sendStatus(500);
  })

}

module.exports = {
  registerUser
}