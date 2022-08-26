const fs = require('fs').promises;

const readTalkerFile = async () => {
  const path = 'src/talker.json';
  try {
    const contentFile = await fs.readFile(path, 'utf-8');

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

module.exports = {
  getAllTalkers,
  getTalkerById,
};
