'use strict';

const prisma = require('../dbs/db');
const { BadRequestError, NotFoundError } = require('../core/error.response');

class OrderService {
    // Create a new order
    static async createOrder(userId, cartItems, paymentMethodId) {
        if (!userId || !cartItems.length || !paymentMethodId) {
            throw new BadRequestError('User ID, cart items, and payment method ID are required');
        }

        // Check if the user exists
        const user = await prisma.users.findUnique({ where: { id: userId } });
        if (!user) {
            throw new BadRequestError('User not found');
        }

        // Calculate total price for the order
        const total = cartItems.reduce((total, item) => {
            const price = item.salePrice < item.originalPrice ? item.salePrice : item.originalPrice;
            return total + price * item.quantity;
        }, 0);

        // Create the order
        const order = await prisma.order.create({
            data: {
                userId,
                addressId: 1, // Example default address ID
                paymentMethodId: paymentMethodId,
                orderStatusId: 1, // Default status ID, e.g., 'Pending'
                total, // Set total price for the order
                orderLine: {
                    create: cartItems.map(item => ({
                        quantity: item.quantity,
                        price: item.salePrice < item.originalPrice ? item.salePrice : item.originalPrice,
                        motorDetailId: item.motorDetailId,
                        accessoriesDetailId: item.accessoriesDetailId,
                    })),
                },
            },
            include: {
                orderLine: true,
                paymentMethod: true,
                address: true,
                orderStatus: true,
            },
        });

        return order;
    }

    // Get order details by order ID
    static async getOrderById(orderId) {
        if (!orderId) {
            throw new BadRequestError('Order ID is required');
        }

        // Find the order
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                orderLine: {
                    include: {
                        motorDetail: true,
                        accessoriesDetail: true,
                    },
                },
                paymentMethod: true,
                address: true,
                orderStatus: true,
            },
        });

        if (!order) {
            throw new NotFoundError('Order not found');
        }

        return order;
    }

    // Update order status
    static async updateOrderStatus(orderId, statusId) {
        if (!orderId || !statusId) {
            throw new BadRequestError('Order ID and status ID are required');
        }

        // Validate status ID
        const validStatus = await prisma.orderStatus.findUnique({ where: { id: statusId } });
        if (!validStatus) {
            throw new BadRequestError('Invalid status ID');
        }

        // Update the order status
        const updatedOrder = await prisma.order.update({
            where: { id: orderId },
            data: { orderStatusId: statusId },
            include: {
                orderLine: true,
                paymentMethod: true,
                address: true,
                orderStatus: true,
            },
        });

        return updatedOrder;
    }

    // Get orders by user ID
    static async getOrdersByUserId(userId) {
        if (!userId) {
            throw new BadRequestError('User ID is required');
        }

        // Find orders for the user
        const orders = await prisma.order.findMany({
            where: { userId },
            include: {
                orderLine: {
                    include: {
                        motorDetail: true,
                        accessoriesDetail: true,
                    },
                },
                paymentMethod: true,
                address: true,
                orderStatus: true,
            },
        });

        return orders;
    }
}

module.exports = OrderService;
