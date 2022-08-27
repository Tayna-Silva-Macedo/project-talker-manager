const fs = require('fs').promises;
const { join } = require('path');

const path = '../talker.json';

const readTalkerFile = async () => {
  try {
    const contentFile = await fs.readFile(join(__dirname, path), 'utf-8');

    return JSON.parse(contentFile);
  } catch (error) {
    return null;
  }
};

const getAllTalkers = async () => {
  const talkers = await readTalkerFile();

  return talkers;
};

const getTalkerById = async (id) => {
  const talkers = await readTalkerFile();
  const talkerSearch = talkers.find((talker) => talker.id === id);

  return talkerSearch;
};

const setTalkerFile = async (talkers) => {
  await fs.writeFile(join(__dirname, path), JSON.stringify(talkers));
};

module.exports = {
  getAllTalkers,
  getTalkerById,
  setTalkerFile,
};
