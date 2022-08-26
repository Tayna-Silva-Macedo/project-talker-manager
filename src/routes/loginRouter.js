const express = require('express');

const generateToken = require('../utils/generateToken');

const { emailValidation, passwordValidation } = require('../middlewares/validationsLogin');

const loginRouter = express.Router();

loginRouter.post('/', emailValidation, passwordValidation, (req, res) => {
  const token = generateToken();

  return res.status(200).json({ token });
});

module.exports = loginRouter;
