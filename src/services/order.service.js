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
    
        // Find the order with initial details
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
    
        // Extract IDs from orderLine
        const motorDetailIds = order.orderLine.map(line => line.motorDetailId).filter(id => id);
        const accessoriesDetailIds = order.orderLine.map(line => line.accessoriesDetailId).filter(id => id);
    
        // Fetch motor details
        const motorDetails = motorDetailIds.length > 0 ? await prisma.motorDetail.findMany({
            where: {
                id: {
                    in: motorDetailIds,
                },
            },
        }) : [];
    
        // Extract motorIds from motorDetails
        const motorIds = motorDetails.map(detail => detail.motorId).filter(id => id);
    
        // Fetch motors
        const motors = motorIds.length > 0 ? await prisma.motor.findMany({
            where: {
                id: {
                    in: motorIds,
                },
            },
        }) : [];
    
        // Fetch accessories details
        const accessoriesDetails = accessoriesDetailIds.length > 0 ? await prisma.accessoriesDetail.findMany({
            where: {
                id: {
                    in: accessoriesDetailIds,
                },
            },
        }) : [];
    
        // Extract accessoriesIds from accessoriesDetails
        const accessoriesIds = accessoriesDetails.map(detail => detail.accessoriesId).filter(id => id);
    
        // Fetch accessories
        const accessories = accessoriesIds.length > 0 ? await prisma.accessories.findMany({
            where: {
                id: {
                    in: accessoriesIds,
                },
            },
        }) : [];
    
        // Create maps for quick lookup
        const motorDetailsMap = new Map(motorDetails.map(detail => [detail.id, detail]));
        const motorsMap = new Map(motors.map(motor => [motor.id, motor]));
        const accessoriesDetailsMap = new Map(accessoriesDetails.map(detail => [detail.id, detail]));
        const accessoriesMap = new Map(accessories.map(accessory => [accessory.id, accessory]));
    
        // Flatten the orderLine with additional details
        const updatedOrderLines = order.orderLine.map(line => {
            const motorDetail = motorDetailsMap.get(line.motorDetailId) || null;
            const accessoriesDetail = accessoriesDetailsMap.get(line.accessoriesDetailId) || null;
            return {
                ...line,
                motorDetail: motorDetail,
                motor: motorDetail ? motorsMap.get(motorDetail.motorId) || null : null,
                accessoriesDetail: accessoriesDetail,
                accessories: accessoriesDetail ? accessoriesMap.get(accessoriesDetail.accessoriesId) || null : null,
            };
        });
    
        return {
            ...order,
            orderLine: updatedOrderLines,
        };
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
