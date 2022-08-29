const authValidation = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  const regexTokenValidation = /^([a-zA-Z\d]){16}$/g;

  if (!regexTokenValidation.test(authorization)) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

const nameValidation = (req, res, next) => {
  const { name } = req.body;

  if (!name || name.length === 0) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res
      .status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const ageValidation = (req, res, next) => {
  const { age } = req.body;

  if (!age || age.length === 0) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    return res
      .status(400)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const talkFieldsValidation = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }

  if (!talk.watchedAt || talk.watchedAt.length === 0) {
    return res
      .status(400)
      .json({ message: 'O campo "watchedAt" é obrigatório' });
  }

  if (talk.rate === undefined) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }

  next();
};

const watchedAtValidation = (req, res, next) => {
  const { talk } = req.body;

  const regexDateValidation = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

  if (!regexDateValidation.test(talk.watchedAt)) {
    return res
      .status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const rateValidation = (req, res, next) => {
  const { talk } = req.body;

  if (talk.rate < 1 || talk.rate > 5 || !Number.isInteger(talk.rate)) {
    return res
      .status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

module.exports = {
  authValidation,
  nameValidation,
  ageValidation,
  talkFieldsValidation,
  watchedAtValidation,
  rateValidation,
};
