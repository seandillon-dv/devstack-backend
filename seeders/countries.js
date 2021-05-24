'use strict';

const countries = require('./countries.json');

module.exports = async (db) => {
  const notEmpty = await db.Country.findOne({ raw : true });
  if(notEmpty) return;
  await db.Country.bulkCreate(countries);
};
