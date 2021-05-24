const router = require('express').Router();

const companyController = require('../controllers/CompanyController');
const developerController = require('../controllers/DeveloperController');

router.get('/companies', companyController.getCompanies);

router.get('/developers', developerController.getDevelopers);
router.get('/developers/:query', developerController.getFilteredDevelopers);

module.exports = router;
