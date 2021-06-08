const {verifyPassword} = require('../models/user');

const verifyCredential = async (req, res) => {
  const result = await verifyPassword(req.body.email, req.body.password)
  if (result) {
    res.status(200).send('Auth = true')
  } else {
    res.status(401).send('Unauthorized')
  }
}

module.exports = {
  verifyCredential
}