'use strict';

const experience_levels = require('./experience_levels.json');

module.exports = async (db) => {
  const notEmpty = await db.ExperienceLevel.findOne({ raw : true });
  if(notEmpty) return;
  await db.ExperienceLevel.bulkCreate(experience_levels);
};
