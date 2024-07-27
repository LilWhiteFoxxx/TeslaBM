'use strict';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const prisma = require('../dbs/db');
const CartService = require('./cart.service');
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

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
            console.log('event err', err);
            throw new Error(`Webhook error: ${err.message}`);
        }

        console.log('event', event.type);
        // Process event based on type
        switch (event.type) {
            case 'checkout.session.completed':
                const completedSession = event.data.object;
                const completedOrderId = completedSession.metadata.orderId;
                const completedUserId = completedSession.metadata.userId;
                console.log('completedOrderId', completedOrderId);
                console.log('completedUserId', completedUserId);
                try {
                    await prisma.order.update({
                        where: { id: Number(completedOrderId) },
                        data: { orderStatusId: 2 },
                    });
                    await CartService.deleteCart(+completedUserId);
                    console.log(`Order ${completedOrderId} paid successfully`);
                } catch (error) {
                    console.error(
                        `Failed to update order ${completedOrderId}:`,
                        error
                    );
                }
                break;

            case 'checkout.session.async_payment_failed':
                const failedSession = event.data.object;
                const failedOrderId = failedSession.metadata.orderId;
                await prisma.order.update({
                    where: { id: failedOrderId },
                    data: { orderStatusId: 3 },
                });
                console.log(`Order ${failedOrderId} payment failed`);
                break;
            case 'checkout.session.expired':
                const expiredSession = event.data.object;
                const expiredOrderId = expiredSession.metadata.orderId;

                await prisma.order.update({
                    where: { id: expiredOrderId },
                    data: { orderStatusId: 3 },
                });
                console.log(`Order ${expiredOrderId} payment failed`);
                break;

            default:
            // console.log(`Unhandled event type: ${event.type}`);
        }
    }
}

module.exports = StripeService;
