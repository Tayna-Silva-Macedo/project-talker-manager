const express = require('express');

const readAndWrite = require('../utils/readAndWrite');

const talkerRouter = express.Router();

talkerRouter.get('/', async (req, res) => {
  const talkers = await readAndWrite.getAllTalkers();
  
  return res.status(200).json(talkers);
});

module.exports = talkerRouter;
