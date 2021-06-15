const jwt = require('jsonwebtoken');
const { SECRET } = require('../env')

const isTokenValid = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorised')
  }
  const token = req.headers.authorization.split(' ')[1]
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send('Unauthorised')
    }
    next()
  })

}

module.exports = isTokenValid