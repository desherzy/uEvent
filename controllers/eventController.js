const eventService = require('../services/eventService');
const fs = require('fs');
const path = require('path');

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
            const events = await eventService.getEvents();
            res.json(events);
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

    async  createEvent(req, res, next) {
        try {
            const { companyId, eventName, description, startTime, endTime, ticketCount, ticketPrice, category } = req.body;
            const bannerImage = req.files && req.files.bannerImage ? req.files.bannerImage : null;
            const eventImage = req.files && req.files.eventImage ? req.files.eventImage : null;

            if (!bannerImage || !eventImage) {
                return res.status(400).json({ message: 'Both bannerImage and eventImage are required' });
            }

            const uploadDir = path.join(__dirname, '../public/eventsImages');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir);
            }

            const bannerFileName = `${Date.now()}-banner.png`;
            const eventFileName = `${Date.now()}-event.png`;

            const bannerFilePath = path.join(uploadDir, bannerFileName);
            const eventFilePath = path.join(uploadDir, eventFileName);

            await bannerImage.mv(bannerFilePath);
            await eventImage.mv(eventFilePath);

            const bannerImageUrl = `${process.env.API_URL}/public/eventsImages/${bannerFileName}`;
            const eventImageUrl = `${process.env.API_URL}/public/eventsImages/${eventFileName}`;

            const event = await eventService.createEvent(companyId , eventName, description, startTime, endTime, ticketCount, ticketPrice, bannerImageUrl, eventImageUrl, category);

            res.json(event);
        } catch (e) {
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