const User = require('../models/User');
const Event = require('../models/Event');
const Ticket = require('../models/Ticket');

class PaymentService {
    async beginBuyingTickets(stripe, userId, eventId, ticketsQuantity) {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error("User with inputted id does not exist, inputted id: " + userId);
        }
        const event = await Event.findByPk(eventId);
        if (!event) {
            throw new Error("Event with inputted id does not exist, inputted id: " + eventId);
        }
        if (event.tickets_maximal_amount < (await Ticket.findAll({where: {event_id: eventId}})).length + ticketsQuantity) {
            throw new Error("Can not buy so many tickets for event, event id: " + eventId);
        }

        const stripeSession = await stripe.checkout.sessions.create({
            customer_email: user.email,
            mode: "payment",
            payment_method_types: ["card"],
            line_items: [{
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: event.name,
                        description: event.description
                    },
                    unit_amount: event.ticket_price
                },
                quantity: ticketsQuantity
            }],
            expires_at: Math.ceil(
                new Date().getTime() / 1000 + Number(process.env.STRIPE_SESSION_EXPIRE_TIME)
            ),
            success_url: process.env.CLIENT_URL + process.env.STRIPE_SUCCESS_URL,
            cancel_url: process.env.CLIENT_URL + process.env.STRIPE_CANCEL_URL,
        });
        /*const webhookEndpoint = await stripe.webhookEndpoints.create({
            enabled_events: ['charge.succeeded', 'charge.expired'],
            url: process.env.API_URL + process.env.STRIPE_WEBHOOK_URL
        });*/

        let createdTickets = new Array();
        for(let index = 0; index < ticketsQuantity; index++) {
            createdTickets.push(await Ticket.create(userId, eventId));
        }

        return {
            stripeSession: stripeSession,
            createdTickets: createdTickets
        }
    }

    async succeededBuyingTickets() {
        //todo
    }

    async expiredBuyingTickets() {
        //todo
    }
}

module.exports = new PaymentService()