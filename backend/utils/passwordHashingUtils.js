const crypto = require("crypto");

const hashPassword = async (string, salt) => {
  return new Promise((resolve, reject) => { 
    const saltGenerated = salt || crypto.randomBytes(12).toString("hex");

    crypto.scrypt(string, saltGenerated, 64, (err, derivedKey) => {
      if (err) reject(err);

      resolve({
        passwordHashed: derivedKey.toString("hex"),
        passwordSalt: saltGenerated
      })
    })
  })
}

const compareStringWithHash = async(string, hash, salt) => {
  if (!(string || hash || salt)) {
    return 0
  } 

  const stringHashed = await hashPassword(string, salt);

  return stringHashed.passwordHashed == hash
}

module.exports = {
  hashPassword,
  compareStringWithHash
}