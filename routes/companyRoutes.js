const Router = require('express').Router;
const authMiddleware = require('../middlewares/authMiddleware');
const router = new Router();
const companyController = require('../controllers/companyController');

router.post('/', authMiddleware, companyController.createCompany);
router.get('/', companyController.getCompanies);
router.get('/:id', companyController.getCompany);
router.patch('/update', authMiddleware, companyController.updateCompany);
router.patch('/image', authMiddleware, companyController.uploadCompanyImage);
router.delete('/image', authMiddleware, companyController.deleteCompanyImage);
router.delete('/', authMiddleware, companyController.deleteCompany);

module.exports = router;