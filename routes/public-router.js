const router = require('express').Router();

const companyController = require('../controllers/CompanyController');
const countryController = require('../controllers/CountryController');
const developerController = require('../controllers/DeveloperController');
const developerTypeController = require('../controllers/DeveloperTypeController');
const technologyController = require('../controllers/TechnologyController');
const experienceLevelController = require('../controllers/ExperienceLevelController');

// Public routes, accessible without an authorisation token.
router.post('/login/company', companyController.loginCompany);
router.post('/login/developer', developerController.loginDeveloper);

router.get('/countries', countryController.getCountries);
router.get('/developer_types', developerTypeController.getDeveloperTypes);
router.get('/technologies', technologyController.getTechnologies);
router.get('/experience_levels', experienceLevelController.getExperienceLevels);

module.exports = router;
