'use strict';

const companies = require('./companies.json');

module.exports = async (db) => {
  const notEmpty = await db.Company.findOne({ raw : true });
  if(notEmpty) return;
  await db.Company.bulkCreate(companies);
};
