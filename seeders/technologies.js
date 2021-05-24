'use strict';

const technologies = require('./technologies.json');

module.exports = async (db) => {
  const notEmpty = await db.Technology.findOne({ raw : true });
  if(notEmpty) return;
  await db.Technology.bulkCreate(technologies);
};
