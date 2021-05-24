'use strict';

const employment_history = require('./employment_history.json');

module.exports = async (db) => {
  const notEmpty = await db.EmploymentHistory.findOne({ raw : true });
  if(notEmpty) return;

  employment_history.forEach(async (data) => {
    const developerId = data.developerId;
    const history = data.history;
    const developer = await db.Developer.findOne({
      where: { id: developerId }
    });
    history.forEach(async (entry) => await developer.createEmployment_history(entry));
  })
};
