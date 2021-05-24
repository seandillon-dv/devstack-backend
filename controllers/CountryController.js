'use strict';

const db = require('../models/_index');

const getCountries = async (req, res) => {
  try {
    const countries = await db.Country.findAll();
    res.status(200).json(countries);
  }
  catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  getCountries,
}
