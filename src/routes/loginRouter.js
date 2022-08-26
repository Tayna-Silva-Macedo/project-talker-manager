const express = require('express');

const generateToken = require('../utils/generateToken');

const loginRouter = express.Router();

loginRouter.post('/', (req, res) => {
  const token = generateToken();

  return res.status(200).json({ token });
});

module.exports = loginRouter;
