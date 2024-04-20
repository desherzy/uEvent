const Router = require('express').Router;
const authMiddleware = require('../middlewares/authMiddleware');
const router = new Router();
const eventController = require('../controllers/eventController');

router.post('/', authMiddleware, eventController.createEvent);
router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEvent);
router.get('/user/:id', eventController.getSubscribedEvents);
router.patch('/update/:id', authMiddleware, eventController.updateEvent);
router.delete('/:id', authMiddleware, eventController.deleteEvent);

module.exports = router;