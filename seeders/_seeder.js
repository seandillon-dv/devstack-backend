require('dotenv').config({path:__dirname+'/../.env'});

const database = require('../models/_index');

const countriesSeeder = require('./countries');
const developerTypesSeeder = require('./developer_types');
const experienceLevelsSeeder = require('./experience_levels');
const technologiesSeeder = require('./technologies');

const companiesSeeder = require('./companies');
const developersSeeder = require('./developers');

const educationHistorySeeder = require('./education_history');
const employmentHistorySeeder = require('./employment_history');

const databaseSeeder = async (db) => {
  await countriesSeeder(db);
  await developerTypesSeeder(db);
  await experienceLevelsSeeder(db);
  await technologiesSeeder(db);

  await companiesSeeder(db);
  await developersSeeder(db);

  await educationHistorySeeder(db);
  await employmentHistorySeeder(db);
}

(async () => {
  await database.sequelize.sync({force: true});
  await databaseSeeder(database);
})();
