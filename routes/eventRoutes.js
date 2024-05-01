const Router = require('express').Router;
const authMiddleware = require('../middlewares/authMiddleware');
const router = new Router();
const eventController = require('../controllers/eventController');

router.post('/', authMiddleware, eventController.createEvent);
router.post('/ticket/:id', authMiddleware, eventController.createTicket);
router.get('/tickets', authMiddleware, eventController.getTickets);
router.get('/categories', eventController.getCategories);
router.get('/',  eventController.getEvents);
router.get('/:id', eventController.getEvent);
router.patch('/update/:id', authMiddleware, eventController.updateEvent);
router.delete('/:id', authMiddleware, eventController.deleteEvent);

module.exports = router;