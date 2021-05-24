'use strict';

const db = require('../models/_index');

const getExperienceLevels = async (req, res) => {
  try {
    const experienceLevels = await db.ExperienceLevel.findAll();
    res.status(200).json(experienceLevels);
  }
  catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  getExperienceLevels,
}
