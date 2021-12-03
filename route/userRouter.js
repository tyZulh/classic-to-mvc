const router = require('express').Router();

const usersController = require('../controller/usersController');

router.get('/', usersController.getAll);
router.get('/:id', usersController.getOneById)
router.post('/', usersController.postOne)

module.exports = router
