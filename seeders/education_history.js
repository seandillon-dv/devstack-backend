'use strict';

const education_history = require('./education_history.json');

module.exports = async (db) => {
  const notEmpty = await db.EducationHistory.findOne({ raw : true });
  if(notEmpty) return;

  education_history.forEach(async (data) => {
    const developerId = data.developerId;
    const history = data.history;
    const developer = await db.Developer.findOne({
      where: { id: developerId }
    });
    history.forEach(async (entry) => await developer.createEducation_history(entry));
  })
};
