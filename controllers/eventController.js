const eventService = require('services/eventService');

class EventController {
    async getEvent(req, res, next) {
        try {
            const id = req.params.id;
            const event = eventService.getEvent(id);
            res.json(event);
        } catch(e) {
            next(e);
        }
    }

    async getEvents(req, res, next) {
        try {

        } catch(e) {
            next(e);
        }
    }

    async getSubscribedEvents(req, res, next) {
        try {

        } catch(e) {
            next(e);
        }
    }

    async createEvent(req, res, next) {
        try {

        } catch(e) {
            next(e);
        }
    }

    async updateEvent(req, res, next) {
        try {

        } catch(e) {
            next(e);
        }
    }

    async deleteEvent(req, res, next) {
        try {

        } catch(e) {
            next(e);
        }
    }

}

module.exports = new EventController();