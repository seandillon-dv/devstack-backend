'use strict';

const developers = require('./developers.json');

module.exports = async (db) => {
  const notEmpty = await db.Developer.findOne({ raw : true });
  if(notEmpty) return;

  developers.forEach(async (developer) => {
    const newDeveloper = await db.Developer.create(developer);

    const developerTechs = developer.technology_ids.map((tech_id) => ({DeveloperId: newDeveloper.id, TechnologyId: tech_id}))
    await db.sequelize.models.DeveloperTechnologies.bulkCreate(developerTechs);

    const developerEligibleCountries = developer.eligible_country_ids.map((country_id) => ({DeveloperId: newDeveloper.id, CountryId: country_id}))
    await db.sequelize.models.DeveloperEligibleCountries.bulkCreate(developerEligibleCountries);
  });
};
