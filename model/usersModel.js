const mysql = require('../db');

const findAll = async () => {
  const result = await mysql.query('SELECT * FROM user')
  return result[0]
}

const findOneById = async (id) => {
  const [result] = await mysql.query('SELECT * FROM user WHERE id = ? ', [id])
  return result
}

const createOne = async (body) => {
  const [result] = await mysql.query('INSERT INTO user SET ?', [body])
  const [user] = await findOneById(result.insertId)
  return user
}

const getOneByEmail = async (email) => {
  const [result] = await mysql.query('SELECT id FROM user WHERE email = ? ', [email])
  return result[0] ? true : false
}
module.exports = {
  findAll,
  findOneById,
  createOne,
  getOneByEmail
}
