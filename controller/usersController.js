const { findAll, findOneById, createOne, getOneByEmail } = require('../model/usersModel');

const getAll = async (req, res) => {
  try {
    const result = await findAll()
    if (!result.length) {
      res.status(404).send('Ressources not found')
    } else {
      res.status(200).json(result)
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
}

const getOneById = async (req, res) => {
  try {
    const result = await findOneById(req.params.id)
    if (!result.length) {
      res.status(404).send('Ressource not found')
    } else {
      res.status(200).json(result)
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
}

const postOne = async (req, res) => {
  try {
    const emailAlreadyExist = await getOneByEmail(req.body.email)
    if (emailAlreadyExist) {
      res.status(400).send('Bad request')
    } else {
      const result = await createOne(req.body)
      res.status(201).json(result)
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
}

module.exports = {
  getAll,
  getOneById,
  postOne
}
