'use strict';

const developer_types = require('./developer_types.json');

module.exports = async (db) => {
  const notEmpty = await db.DeveloperType.findOne({ raw : true });
  if(notEmpty) return;
  await db.DeveloperType.bulkCreate(developer_types);
};
