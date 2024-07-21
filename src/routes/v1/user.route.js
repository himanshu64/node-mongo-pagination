const express = require('express');
const { userController } = require('../../controllers');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');

const router = express.Router();

router.get('/getUsers', validate(userValidation.getUsers), userController.getUsers);

module.exports = router;
