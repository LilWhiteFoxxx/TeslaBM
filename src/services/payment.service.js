'use strict';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Load Stripe secret key from environment variables
const { BadRequestError } = require('../core/error.response');
const prisma = require('../dbs/db');
const CartService = require('./cart.service');
const OrderService = require('./order.service');

class PaymentService {
    static async createCheckoutSession(userId, payload) {
        // Validate input parameters
        if (
            !userId ||
            !payload ||
            !payload.products ||
            !Array.isArray(payload.products)
        ) {
            throw new BadRequestError('Invalid payload or products array');
        }

        const { products } = payload;

        // Map products to Stripe line items
        const lineItems = products.map((product) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: product.itemName,
                    images: product.itemImg ? [product.itemImg] : [], // Ensure images is an array
                },
                unit_amount: Math.round(product.originalPrice * 100),
            },
            quantity: String(product.quantity),
        }));

        let order;
        try {
            // Create order in the database
            order = await OrderService.createOrder(userId, products, 2);
            if (order) {
                await CartService.deleteCart(userId);
            }
        } catch (error) {
            throw new Error(`Failed to create order: ${error.message}`);
        }

        try {
            // Create Stripe checkout session
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: lineItems,
                mode: 'payment', // Specify the mode of the session (e.g., 'payment', 'subscription')
                success_url: `http://localhost:3000/groupproject/invoicer/${order.id}`,
                cancel_url: `http://localhost:3000/groupproject/error`,
            });

            return session;
        } catch (error) {
            // If session creation fails, delete the order and throw an error
            await prisma.order.delete({
                where: {
                    id: order.id,
                },
            });
            throw new Error(
                `Failed to create checkout session: ${error.message}`
            );
        }
    }
}

module.exports = PaymentService;
