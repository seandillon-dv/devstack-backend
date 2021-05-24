'use strict';

const db = require('../models/_index');

const getDeveloperTypes = async (req, res) => {
  try {
    const developerTypes = await db.DeveloperType.findAll();
    res.status(200).json(developerTypes);
  }
  catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  getDeveloperTypes,
}
