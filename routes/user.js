const router = require('express').Router();
const usersController = require('../controllers/user');
const isTokenValid = require('../middleware/isTokenValid');

router.get('/', isTokenValid, usersController.getAll);
router.get('/:id', usersController.getOne);
router.post('/', usersController.handlePost);
router.put('/:id', usersController.handeleUpdate);
router.delete('/:id', usersController.handleDelete);

module.exports = router;

