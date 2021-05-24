'use strict';

const db = require('../models/_index');

const processDeveloperQueryParams = require('../functions/developer-query-params-getter');

const getDevelopers = async (req, res) => {
  try {
    let developers = await db.Developer.findAll({
      include: [
        {
          model: db.Country,
          as: 'country'
        },
        {
          model: db.ExperienceLevel,
          as: 'experience_level'
        },
        {
          model: db.DeveloperType,
          as: 'developer_type'
        },
        {
          model: db.Technology,
          through: 'DeveloperTechnologies',
          as: 'technologies'
        },
        {
          model: db.Country,
          through: 'DeveloperEligibleCountries',
          as: 'eligible_countries'
        },
        {
          model: db.EducationHistory,
          as: 'education_history',
          include: [
            {
              model: db.Country,
              as: 'country'
            }
          ]
        },
        {
          model: db.EmploymentHistory,
          as: 'employment_history',
          include: [
            {
              model: db.Country,
              as: 'country'
            }
          ]
        },
      ]
    });

    developers = developers.map(developer => developer.toJSON());

    res.status(200).json(developers);
  }
  catch (error) {
    res.status(500).send(error);
  }
}

const getFilteredDevelopers = async (req, res) => {
  try {
    const { query } = req.params;
    const queries = processDeveloperQueryParams(query);

    const where = {}

    if (queries.experience_level) where.experience_level_id = queries.experience_level;
    if (queries.developer_type) where.developer_type_id = queries.developer_type;

    let developers = await db.Developer.findAll({
      where: where,
      include: [
        {
          model: db.Country,
          as: 'country'
        },
        {
          model: db.ExperienceLevel,
          as: 'experience_level'
        },
        {
          model: db.DeveloperType,
          as: 'developer_type'
        },
        {
          model: db.Technology,
          through: 'DeveloperTechnologies',
          as: 'technologies'
        },
        {
          model: db.Country,
          through: 'DeveloperEligibleCountries',
          as: 'eligible_countries'
        },
        {
          model: db.EducationHistory,
          as: 'education_history',
          include: [
            {
              model: db.Country,
              as: 'country'
            }
          ]
        },
        {
          model: db.EmploymentHistory,
          as: 'employment_history',
          include: [
            {
              model: db.Country,
              as: 'country'
            }
          ]
        },
      ]
    });

    // TODO: FIX THIS TO BE DONE ON THE QUERY ABOVE
    if (queries.technologies && Number.isInteger(queries.technologies[0])) {
      developers = developers.filter((developer) => {
        const developerTechIds = developer.technologies.map(tech => tech.dataValues.id);

        for (let i = 0; i < queries.technologies.length; ++i) {
          if (!developerTechIds.includes(queries.technologies[i])) return false;
        }

        return true;
      });
    }
    // TODO ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    res.status(200).json(developers);
  }
  catch (error) {
    res.status(500).send(error);
  }
}

const loginDeveloper = async (req, res) => {
  try {
    const { email, password } = req.body;

    const developer = await db.Developer.findOne({
      where: {
        email: email,
      },
      include: [
        {
          model: db.Country,
          as: 'country'
        },
        {
          model: db.ExperienceLevel,
          as: 'experience_level'
        },
        {
          model: db.DeveloperType,
          as: 'developer_type'
        },
        {
          model: db.Technology,
          through: 'DeveloperTechnologies',
          as: 'technologies'
        },
        {
          model: db.Country,
          through: 'DeveloperEligibleCountries',
          as: 'eligible_countries'
        },
        {
          model: db.EducationHistory,
          as: 'education_history',
          include: [
            {
              model: db.Country,
              as: 'country'
            }
          ]
        },
        {
          model: db.EmploymentHistory,
          as: 'employment_history',
          include: [
            {
              model: db.Country,
              as: 'country'
            }
          ]
        },
      ]
    })

    res.status(200).json(developer);
  }
  catch (error) {
    res.status(500).send(error);
  }
}

const postDeveloper = async (req, res) => {
  try { // TODO !
    const developers = await db.Developer.findAll();
    res.status(201).json(developers);
  }
  catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  getDevelopers,
  getFilteredDevelopers,
  loginDeveloper,
  postDeveloper,
}
