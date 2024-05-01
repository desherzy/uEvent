const Event = require('../models/Event');
const Category = require('../models/Category');
const EventCategory  = require('../models/EventCategory');
const Ticket = require('../models/Ticket');
const ApiError = require("../exceptions/apiError");
const {where} = require("sequelize");

class EventService {
    async getEvent(id){

    }

    async getEvents(){
        const events = await Event.findAll();

        for (const event of events) {
            const eventCategory = await EventCategory.findOne({
                where: { event_id: event.id }
            });

            if (eventCategory) {
                const category = await Category.findByPk(eventCategory.category_id);
                if (category) {
                    event.dataValues.categoryName = category.name;
                }
            }
        }

        return events;
    }

    async getCategories() {
        const categories = await Category.findAll();
        return categories;
    }

    async getTickets(userId){
        const userTickets = await Ticket.findAll({where: {user_id: userId}});

        return userTickets;
    }

    async createTicket(userId, eventId){
        const existingTicket = await Ticket.findOne({
            where: {
                user_id: userId,
                event_id: eventId
            }
        });

        if (existingTicket) {
            throw ApiError.badRequest("Ticket already exists for this user and event");
        }

        const ticket = await Ticket.create({
            user_id: userId,
            event_id: eventId
        });

        return ticket;
    }

    async createEvent(companyId, eventName, description, startTime, endTime, ticketCount, ticketPrice, bannerImageUrl, eventImageUrl, categoryName, latitude, longitude){
        const event = await Event.create({
            name: eventName,
            description: description,
            tickets_maximal_amount: ticketCount,
            ticket_price: ticketPrice,
            card_image: eventImageUrl,
            banner_image: bannerImageUrl,
            start_time: startTime,
            company_id: companyId,
            latitude: latitude,
            longitude: longitude,
            end_time: endTime
        });

        const category = await Category.findOne({where: {name: categoryName}});
        const eventCategory = await EventCategory.create({
            event_id: event.id,
            category_id: category.id,
        })

        event.categoryName = category.name;

        return event;
    }

    async updateEvent(id, event){

    }

    async deleteEvent(id){

    }


}

module.exports = new EventService();