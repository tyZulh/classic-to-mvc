const router = require('express').Router()
const authController = require('../controllers/auth')

router.post('/verifyCredential', authController.verifyCredential)

module.exports = router;
