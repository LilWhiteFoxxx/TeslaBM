'use strict';

const prisma = require('../dbs/db');
const { BadRequestError, NotFoundError } = require('../core/error.response');

class OrderService {
    // Create a new order
    static async createOrder(userId, cartItems, paymentMethodId) {
        if (!userId || !cartItems.length || !paymentMethodId) {
            throw new BadRequestError(
                'User ID, cart items, and payment method ID are required'
            );
        }

        // Check if the user exists
        const user = await prisma.users.findUnique({ where: { id: userId } });
        if (!user) {
            throw new BadRequestError('User not found');
        }

        // Calculate total price for the order
        const total = cartItems.reduce((total, item) => {
            const price =
                item.salePrice < item.originalPrice
                    ? item.salePrice
                    : item.originalPrice;
            return total + price * item.quantity;
        }, 0);

        let order;

        try {
            // Create the order
            order = await prisma.order.create({
                data: {
                    userId,
                    addressId: 1, // Example default address ID
                    paymentMethodId: paymentMethodId,
                    orderStatusId: 1, // Default status ID, e.g., 'Pending'
                    total, // Set total price for the order
                    orderLine: {
                        create: cartItems.map((item) => ({
                            quantity: item.quantity,
                            price:
                                item.salePrice < item.originalPrice
                                    ? item.salePrice
                                    : item.originalPrice,
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

            // Update inventory for each item in the cart
            await Promise.all(
                cartItems.map(async (item) => {
                    if (item.motorDetailId) {
                        await prisma.inventories.updateMany({
                            where: { motorDetailId: item.motorDetailId },
                            data: {
                                stock: {
                                    decrement: item.quantity,
                                },
                            },
                        });
                    }
                    if (item.accessoriesDetailId) {
                        await prisma.inventories.updateMany({
                            where: {
                                accessoriesDetailId: item.accessoriesDetailId,
                            },
                            data: {
                                stock: {
                                    decrement: item.quantity,
                                },
                            },
                        });
                    }
                })
            );
        } catch (error) {
            // Rollback any changes if order creation or inventory update fails
            if (order) {
                await prisma.order.delete({ where: { id: order.id } });
            }
            throw error;
        }

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
        const motorDetailIds = order.orderLine
            .map((line) => line.motorDetailId)
            .filter((id) => id);
        const accessoriesDetailIds = order.orderLine
            .map((line) => line.accessoriesDetailId)
            .filter((id) => id);

        // Fetch motor details
        const motorDetails =
            motorDetailIds.length > 0
                ? await prisma.motorDetail.findMany({
                      where: {
                          id: {
                              in: motorDetailIds,
                          },
                      },
                  })
                : [];

        // Extract motorIds from motorDetails
        const motorIds = motorDetails
            .map((detail) => detail.motorId)
            .filter((id) => id);

        // Fetch motors
        const motors =
            motorIds.length > 0
                ? await prisma.motor.findMany({
                      where: {
                          id: {
                              in: motorIds,
                          },
                      },
                  })
                : [];

        // Fetch accessories details
        const accessoriesDetails =
            accessoriesDetailIds.length > 0
                ? await prisma.accessoriesDetail.findMany({
                      where: {
                          id: {
                              in: accessoriesDetailIds,
                          },
                      },
                  })
                : [];

        // Extract accessoriesIds from accessoriesDetails
        const accessoriesIds = accessoriesDetails
            .map((detail) => detail.accessoriesId)
            .filter((id) => id);

        // Fetch accessories
        const accessories =
            accessoriesIds.length > 0
                ? await prisma.accessories.findMany({
                      where: {
                          id: {
                              in: accessoriesIds,
                          },
                      },
                  })
                : [];

        // Create maps for quick lookup
        const motorDetailsMap = new Map(
            motorDetails.map((detail) => [detail.id, detail])
        );
        const motorsMap = new Map(motors.map((motor) => [motor.id, motor]));
        const accessoriesDetailsMap = new Map(
            accessoriesDetails.map((detail) => [detail.id, detail])
        );
        const accessoriesMap = new Map(
            accessories.map((accessory) => [accessory.id, accessory])
        );

        // Flatten the orderLine with additional details
        const updatedOrderLines = order.orderLine.map((line) => {
            const motorDetail = motorDetailsMap.get(line.motorDetailId) || null;
            const accessoriesDetail =
                accessoriesDetailsMap.get(line.accessoriesDetailId) || null;
            return {
                ...line,
                motorDetail: motorDetail,
                motor: motorDetail
                    ? motorsMap.get(motorDetail.motorId) || null
                    : null,
                accessoriesDetail: accessoriesDetail,
                accessories: accessoriesDetail
                    ? accessoriesMap.get(accessoriesDetail.accessoriesId) ||
                      null
                    : null,
            };
        });

        return {
            ...order,
            orderLine: updatedOrderLines,
        };
    }

    // Update order status
    static async updateOrderStatus(orderId, statusId) {
        console.log(orderId, statusId);

        if (!orderId || !statusId) {
            throw new BadRequestError('Order ID and status ID are required');
        }

        // Validate status ID
        const validStatus = await prisma.orderStatus.findUnique({
            where: { id: statusId },
        });
        if (!validStatus) {
            throw new BadRequestError('Invalid status ID');
        }

        // Fetch the current order details
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                orderLine: true,
            },
        });

        if (!order) {
            throw new BadRequestError('Order not found');
        }

        // Check if the new status is 3 and update inventory if so
        if (statusId === 3) {
            // Increment stock for each item in the order
            await Promise.all(
                order.orderLine.map(async (lineItem) => {
                    if (lineItem.motorDetailId) {
                        await prisma.inventories.updateMany({
                            where: { motorDetailId: lineItem.motorDetailId },
                            data: {
                                stock: {
                                    increment: lineItem.quantity,
                                },
                            },
                        });
                    }
                    if (lineItem.accessoriesDetailId) {
                        await prisma.inventories.updateMany({
                            where: {
                                accessoriesDetailId:
                                    lineItem.accessoriesDetailId,
                            },
                            data: {
                                stock: {
                                    increment: lineItem.quantity,
                                },
                            },
                        });
                    }
                })
            );
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

    static async getOrdersByUserId(userId) {
        if (!userId) {
            throw new BadRequestError('User ID is required');
        }

        // Find orders for the user, sorted by createdAt in descending order
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
            orderBy: {
                createdAt: 'desc', // Sort by createdAt in descending order
            },
        });

        return orders;
    }

    static async getAllOrder() {
        // Fetch orders from the database
        const orders = await prisma.order.findMany({
            select: {
                id: true,
                total: true,
                users: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        phoneNumber: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                address: {
                    select: {
                        id: true,
                        street: true,
                        ward: true,
                        district: true,
                        city: true,
                        country: true,
                    },
                },
                orderStatus: {
                    select: {
                        id: true,
                        status: true,
                    },
                },
                createdAt: true,
                paymentMethod: {
                    select: {
                        id: true,
                        type: true,
                    },
                },
                orderLine: {
                    select: {
                        id: true,
                        quantity: true,
                        price: true,
                        motorDetailId: true,
                        motorDetail: {
                            include: {
                                motor: true,
                            },
                        },
                        accessoriesDetailId: true,
                        accessoriesDetail: {
                            include: {
                                accessories: true,
                            },
                        },
                        orderId: true,
                    },
                },
            },
        });

        // Transform the nested data into a flat structure
        const flattenedOrders = orders.map((order) => ({
            id: order.id,
            total: order.total,
            userId: order.users.id,
            name: `${order.users.firstName} ${order.users.lastName}`,
            username: order.users.username,
            email: order.users.email,
            phoneNumber: order.users.phoneNumber,
            addressId: order.address.id,
            address: `${order.address.street}, ${order.address.ward}, ${order.address.district}, ${order.address.city}, ${order.address.country}`,
            orderStatusId: order.orderStatus.id,
            orderStatus: order.orderStatus.status,
            createdAt: order.createdAt,
            paymentMethodId: order.paymentMethod.id,
            paymentMethodType: order.paymentMethod.type,
            orderLines: order.orderLine.map((line) => ({
                id: line.id,
                quantity: line.quantity,
                price: line.price,
                motorDetailId: line.motorDetailId,
                motorId: line.motorDetail ? line.motorDetail.motor.id : null,
                motorName: line.motorDetail
                    ? line.motorDetail.motor.name
                    : null,
                motorSlug: line.motorDetail
                    ? line.motorDetail.motor.slug
                    : null,
                motorDesc: line.motorDetail
                    ? line.motorDetail.motor.desc
                    : null,
                motorOriginalPrice: line.motorDetail
                    ? line.motorDetail.motor.originalPrice
                    : null,
                motorMfg: line.motorDetail ? line.motorDetail.motor.mfg : null,
                motorCategoryId: line.motorDetail
                    ? line.motorDetail.motor.categoryId
                    : null,
                motorImg: line.motorDetail ? line.motorDetail.motor.img : null,
                motorImgHover: line.motorDetail
                    ? line.motorDetail.motor.imgHover
                    : null,
                accessoriesDetailId: line.accessoriesDetailId,
                accessoriesId: line.accessoriesDetail
                    ? line.accessoriesDetail.accessories.id
                    : null,
                accessoriesName: line.accessoriesDetail
                    ? line.accessoriesDetail.accessories.name
                    : null,
                accessoriesSlug: line.accessoriesDetail
                    ? line.accessoriesDetail.accessories.slug
                    : null,
                accessoriesDesc: line.accessoriesDetail
                    ? line.accessoriesDetail.accessories.desc
                    : null,
                accessoriesOriginalPrice: line.accessoriesDetail
                    ? line.accessoriesDetail.accessories.originalPrice
                    : null,
                accessoriesMfg: line.accessoriesDetail
                    ? line.accessoriesDetail.accessories.mfg
                    : null,
                accessoriesImg: line.accessoriesDetail
                    ? line.accessoriesDetail.accessories.img
                    : null,
                accessoriesImgHover: line.accessoriesDetail
                    ? line.accessoriesDetail.accessories.imgHover
                    : null,
                orderId: line.orderId,
            })),
        }));

        return flattenedOrders;
    }

    // Get total sales amount
    static async getTotalSales(startDate, endDate) {
        if (!startDate || !endDate) {
            throw new BadRequestError('Start date and end date are required');
        }

        const totalSales = await prisma.order.aggregate({
            where: {
                createdAt: {
                    gte: new Date(startDate),
                    lte: new Date(endDate),
                },
            },
            _sum: {
                total: true,
            },
        });

        return totalSales._sum.total || 0;
    }

    // Get total number of orders
    static async getTotalOrders(startDate, endDate) {
        if (!startDate || !endDate) {
            throw new BadRequestError('Start date and end date are required');
        }

        const totalOrders = await prisma.order.count({
            where: {
                createdAt: {
                    gte: new Date(startDate),
                    lte: new Date(endDate),
                },
            },
        });

        return totalOrders;
    }

    // Get average order value
    static async getAverageOrderValue(startDate, endDate) {
        if (!startDate || !endDate) {
            throw new BadRequestError('Start date and end date are required');
        }

        const { _avg } = await prisma.order.aggregate({
            where: {
                createdAt: {
                    gte: new Date(startDate),
                    lte: new Date(endDate),
                },
            },
            _avg: {
                total: true,
            },
        });

        return _avg.total || 0;
    }

    // Get top-selling products
    static async getTopSellingProducts(startDate, endDate) {
        if (!startDate || !endDate) {
            throw new BadRequestError('Start date and end date are required');
        }

        const topSellingProducts = await prisma.orderLine.groupBy({
            by: ['motorDetailId', 'accessoriesDetailId'],
            _sum: {
                quantity: true,
            },
            where: {
                order: {
                    createdAt: {
                        gte: new Date(startDate),
                        lte: new Date(endDate),
                    },
                },
            },
            orderBy: {
                _sum: {
                    quantity: 'desc',
                },
            },
            take: 10, // Top 10 products
        });

        return topSellingProducts;
    }

    static async getOrderTotalSaleByStatus(startDate, endDate) {
        if (!startDate || !endDate) {
            throw new BadRequestError('Start date and end date are required');
        }
    
        try {
            const statistics = await prisma.order.groupBy({
                by: ['orderStatusId'],
                _sum: {
                    total: true,
                },
                where: {
                    createdAt: {
                        gte: new Date(startDate),
                        lte: new Date(endDate),
                    },
                    orderStatusId: 4, 
                },
            });
    
            const count = await prisma.order.count({
                where: {
                    createdAt: {
                        gte: new Date(startDate),
                        lte: new Date(endDate),
                    },
                    orderStatusId: 4,
                }
            });
    
            return {
                totalSales: statistics,
                orderCount: count
            };
        } catch (error) {
            console.error('Error getting order statistics:', error);
            throw new Error('Error retrieving order statistics');
        }
    }
}

module.exports = OrderService;
