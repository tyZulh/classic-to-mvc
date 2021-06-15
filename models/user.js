const mysql = require("../db");
const argon2 = require("argon2")

const findAll = async () => {
  const result = await mysql.query("SELECT * FROM user");
  return result[0];
};

const findOne = async (id) => {
  const result = await mysql.query("SELECT id, email FROM user WHERE id = ?", id);
  return result[0];
};

const findOneByEmail = async (email) => {
  const result = await mysql.query("SELECT * FROM user WHERE email = ?", email);
  if(result[0].length){
    return result[0];
  } else {
    throw new Error
  }
};

const create = async (body) => {
  await emailAlreadyExists(body.email)
  validate(body.password)
  const hash = await hashPassword(body.password)
  const result = await mysql.query("INSERT INTO user SET ?", {...body, password: hash});
  return findOne(result[0].insertId);
};

const deleteOne = async (id) => {
  const result = await mysql.query("DELETE FROM user WHERE id = ?", id);
  return result[0];
};

const update = async (id, body) => {
  await mysql.query("UPDATE user SET ? WHERE id = ?", [body, id]);
  return findAll(id);
};

const emailAlreadyExists = async (email) => {
  const result = await mysql.query(
    "SELECT email FROM user WHERE email = ?",
    email
  );
  if (result[0].length) {
    console.log(result[0]);
    throw new Error
  }
};

const validate = (password) => {
  if (password.length < 8) {
    throw new Error
  }
}

const hashPassword = async (password) => {
  try {
    const hash = await argon2.hash(password);
    return hash
  } catch (err) {
    console.error(err);
    throw new Error
  }
}

const verifyPassword = async (email, password) => {
  const user = await findOneByEmail(email)
  try {
    if (await argon2.verify(user[0].password, password)) {
      return user[0].id
    } else {
      return false
    }
  } catch (err) {
    throw new Error
  }
}

module.exports = {
  findAll,
  findOne,
  create,
  deleteOne,
  update,
  verifyPassword,
};
