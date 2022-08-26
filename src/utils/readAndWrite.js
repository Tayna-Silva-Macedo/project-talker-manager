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

module.exports = {
  getAllTalkers,
};
