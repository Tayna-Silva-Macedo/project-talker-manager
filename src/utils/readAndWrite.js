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

const setTalkerFile = async (talkers) => {
  await fs.writeFile(join(__dirname, path), JSON.stringify(talkers));
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

const updateTalker = async (id, newInfo) => {
  const talkers = await getAllTalkers();

  const talkerToUpdate = await getTalkerById(id);

  if (talkerToUpdate) {
    const index = talkers.indexOf(talkerToUpdate);
    const updated = { id, ...newInfo };
    talkers.splice(index, 1, updated);

    await setTalkerFile(talkers);

    return updated;
  }

  return false;
};

const deleteTalker = async (id) => {
  const talkers = await getAllTalkers();

  const talkerToDelete = await getTalkerById(id);

  if (talkerToDelete) {
    const index = talkers.indexOf(talkerToDelete);
    talkers.splice(index, 1);

    await setTalkerFile(talkers);

    return true;
  }

  return false;
};

module.exports = {
  getAllTalkers,
  getTalkerById,
  setTalkerFile,
  updateTalker,
  deleteTalker,
};
