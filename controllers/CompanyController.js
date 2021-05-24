'use strict';

const db = require('../models/_index');

const getCompanies = async (req, res) => {
  try {
    const companies = await db.Company.findAll();
    res.status(200).json(companies);
  }
  catch (error) {
    res.status(500).send(error);
  }
}

const loginCompany = async (req, res) => {
  try {
    const { username, password } = req.body;

    const company = await db.Company.findOne({
      where: {
        name: username,
      }
    })

    res.status(200).json(company);
  }
  catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  getCompanies,
  loginCompany,
}
