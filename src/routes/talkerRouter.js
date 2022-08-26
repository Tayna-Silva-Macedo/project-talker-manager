const express = require('express');

const readAndWrite = require('../utils/readAndWrite');

const {
  authValidation,
  nameValidation,
  ageValidation,
  talkFieldsValidation,
  watchedAtValidation,
  rateValidation,
} = require('../middlewares/validationsTalker');

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

talkerRouter.post(
  '/',
  authValidation,
  nameValidation,
  ageValidation,
  talkFieldsValidation,
  watchedAtValidation,
  rateValidation,
  async (req, res) => {
    const newTalker = req.body;

    const talkers = await readAndWrite.getAllTalkers();
    let lastId;

    if (talkers.length === 0) {
      lastId = 0;
    } else {
      const lastTalker = talkers[talkers.length - 1];
      lastId = lastTalker.id;
    }

    const newTalkerFile = [...talkers, { ...newTalker, id: lastId + 1 }];
    await readAndWrite.setTalkerFile(newTalkerFile);

    res.status(201).json({ ...newTalker, id: lastId + 1 });
  },
);

module.exports = talkerRouter;
