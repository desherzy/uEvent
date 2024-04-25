const Event = require('../models/Event');
const Category = require('../models/Category');
const EventCategory  = require('../models/EventCategory');

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
                    event.categoryName = category.name;
                }
            }
        }

        return events;
    }

    async getSubscribedEvents(userId){

    }

    async createEvent(companyId, eventName, description, startTime, endTime, ticketCount, ticketPrice, bannerImageUrl, eventImageUrl, categoryName){
        const event = await Event.create({
            name: eventName,
            description: description,
            tickets_maximal_amount: ticketCount,
            ticket_price: ticketPrice,
            card_image: eventImageUrl,
            banner_image: bannerImageUrl,
            start_time: startTime,
            company_id: companyId,
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