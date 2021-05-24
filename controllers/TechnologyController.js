'use strict';

const db = require('../models/_index');

const getTechnologies = async (req, res) => {
  try {
    const technologies = await db.Technology.findAll();
    res.status(200).json(technologies);
  }
  catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  getTechnologies,
}
