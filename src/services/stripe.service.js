'use strict';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const prisma = require('../dbs/db');
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

class StripeService {
    static async processEvent(reqBody, sig) {
        let event;

        try {
            event = stripe.webhooks.constructEvent(
                reqBody,
                sig,
                endpointSecret
            );
        } catch (err) {
            throw new Error(`Webhook error: ${err.message}`);
        }

        // Process event based on type
        switch (event.type) {
            case 'checkout.session.completed':
                const session = event.data.object;
                console.log(session.id);
                await prisma.order.update({
                    where: { id: session.id },
                    data: { orderStatusId: 2 },
                });
                console.log(`Order ${session.id} paid successfully`);
                break;

            case 'checkout.session.async_payment_failed':
                const failedSession = event.data.object;
                await prisma.order.update({
                    where: { id: failedSession.id },
                    data: { orderStatusId: 3 },
                });
                console.log(`Order ${failedSession.id} payment failed`);
                break;
            case 'checkout.session.expired':
                const expiredSession = event.data.object;
                await prisma.order.update({
                    where: { id: expiredSession.id },
                    data: { orderStatusId: 3 },
                });
                console.log(`Order ${failedSession.id} payment failed`);
                break;

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }
    }
}

module.exports = StripeService;
