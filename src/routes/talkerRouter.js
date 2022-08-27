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

talkerRouter.get('/search', authValidation, async (req, res) => {
  const { q } = req.query;

  const filteredTalkers = await readAndWrite.getTalkerByQuery(q);

  return res.status(200).json(filteredTalkers);
});

talkerRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await readAndWrite.getTalkerById(Number(id));

  if (talker) {
    return res.status(200).json(talker);
  }

  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

talkerRouter.use(authValidation);

talkerRouter.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);

  const deleted = await readAndWrite.deleteTalker(id);

  if (deleted) {
    return res.status(204).end();
  }

  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

talkerRouter.use(
  nameValidation,
  ageValidation,
  talkFieldsValidation,
  watchedAtValidation,
  rateValidation,
);

talkerRouter.post('/', async (req, res) => {
  const newTalkerInfo = req.body;

  const newTalkerObj = await readAndWrite.insertTalker(newTalkerInfo);

  return res.status(201).json(newTalkerObj);
});

talkerRouter.put('/:id', async (req, res) => {
  const id = Number(req.params.id);

  const updated = await readAndWrite.updateTalker(id, req.body);

  if (updated) {
    return res.status(200).json(updated);
  }

  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

module.exports = talkerRouter;
