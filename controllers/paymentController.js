const paymentService = require('../services/paymentService');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/apiError');
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

class PaymentController {
    async beginBuyingTickets(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Validation error', errors.array()));
            }
            const userId = req.parameters.id;
            const {eventId, ticketsQuantity} = req.body;
            const {stripeSession, createdTickets} = await paymentService.beginBuyingTickets(stripe, userId, eventId, ticketsQuantity);
            res.status(200).json({
                message: "Session has been created successfully",
                url: stripeSession.url,
                createdTickets: createdTickets
            });
        }
        catch(e) {
            next(e);
        }
    }

    async webhookHandler(req, res, next) {
        try {
            const sig = req.headers['stripe-signature'];
            const eventType = req.body.type;
            const ticketsIds = req.body.metadata.ticketsIds;
            switch (eventType) {
                case "checkout.session.completed":
                    await paymentService.completedBuyingTickets(ticketsIds);
                    //todo add mailer
                    break;
                case "checkout.session.expired":
                    await paymentService.expiredBuyingTickets(ticketsIds);
                    break;
                default:
                    throw new Error("Unhandled event type: " + eventType);
            }
            res.send();
        }
        catch (e) {
            next(e);
        }
    }
}

module.exports = new PaymentController();