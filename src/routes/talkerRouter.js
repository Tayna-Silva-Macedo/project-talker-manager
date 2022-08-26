const express = require('express');

const readAndWrite = require('../utils/readAndWrite');

const talkerRouter = express.Router();

talkerRouter.get('/', async (req, res) => {
  const talkers = await readAndWrite.getAllTalkers();

  return res.status(200).json(talkers);
});

talkerRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await readAndWrite.getTalkerById(Number(id));

  if (talker) {
    return res.status(200).json(talker);
  }

  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

module.exports = talkerRouter;
