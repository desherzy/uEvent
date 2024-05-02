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
        catch (e) {
            next(e);
        }
    }

    async webhookHandler(req, res, next) {
        try {
            //todo
        }
        catch (e) {
            next(e);
        }
    }
}

module.exports = new PaymentController();