'use strict';

const ProductService = require('../services/product.service');
const { OK, CREATED, SuccessResponse } = require('../core/success.response');

class ProductController {
    getAllMotorByCategory = async (req, res, next) => {
        try {
            const { categoryId, limit, offset } = req.query;
            const motors = await ProductService.getAllMotorByCategory(
                parseInt(categoryId),
                parseInt(limit),
                parseInt(offset)
            );
            new SuccessResponse({
                message: 'Get all motors by category success!',
                metadata: motors,
            }).send(res);
        } catch (error) {
            next(error);
        }
    };

    getMotorDetail = async (req, res, next) => {
        try {
            const { id } = req.params;
            const motor = await ProductService.getMotorDetail(parseInt(id));
            new SuccessResponse({
                message: 'Get motor detail success!',
                metadata: motor,
            }).send(res);
        } catch (error) {
            next(error);
        }
    };

    getAllMotor = async (req, res, next) => {
        try {
            const { limit, offset } = req.query;
            const motors = await ProductService.getAllMotor(
                parseInt(limit),
                parseInt(offset)
            );
            new SuccessResponse({
                message: 'Get all motors success!',
                metadata: motors,
            }).send(res);
        } catch (error) {
            next(error);
        }
    };

    createMotor = async (req, res, next) => {
        try {
            const { name, desc, originalPrice, categoryId } = req.body;

            if (!name || !desc || !originalPrice || !categoryId) {
                throw new BadRequestError(
                    'Name, desc, originalPrice, and categoryId are required!'
                );
            }

            const newMotor = await ProductService.createMotor(
                name,
                desc,
                parseInt(originalPrice),
                parseInt(categoryId)
            );
            new SuccessResponse(
                {
                    message: 'Motor created successfully!',
                    metadata: newMotor,
                },
                CREATED
            ).send(res);
        } catch (error) {
            next(error);
        }
    };

    // Tạo một motor mới
    createMotor = async (req, res, next) => {
        try {
            const { name, desc, originalPrice, categoryId } = req.body;

            if (!name || !desc || !originalPrice || !categoryId) {
                throw new BadRequestError(
                    'Name, desc, originalPrice, and categoryId are required!'
                );
            }

            const newMotor = await ProductService.createMotor(
                name,
                desc,
                parseFloat(originalPrice),
                parseInt(categoryId)
            );
            new SuccessResponse(
                {
                    message: 'Motor created successfully!',
                    metadata: newMotor,
                },
                CREATED
            ).send(res);
        } catch (error) {
            next(error);
        }
    };

    // Cập nhật một motor theo id
    updateMotor = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { name, desc, originalPrice, categoryId } = req.body;

            const motorId = parseInt(id);
            const price = parseInt(originalPrice)
            if (isNaN(motorId)) {
                throw new BadRequestError('Motor ID must be a number!');
            }

            const updatedMotor = await ProductService.updateMotor(
                motorId,
                name,
                null,
                desc,
                price,
                categoryId
            );
            if (!updatedMotor) {
                throw new BadRequestError('Motor not found!');
            }

            new SuccessResponse({
                message: 'Motor updated successfully!',
                metadata: updatedMotor,
            }).send(res);
        } catch (error) {
            next(error);
        }
    };

    // Xóa một motor theo id
    deleteMotor = async (req, res, next) => {
        try {
            const { id } = req.params;

            const motorId = parseInt(id);
            if (isNaN(motorId)) {
                throw new BadRequestError('Motor ID must be a number!');
            }

            await ProductService.deleteMotor(motorId);
            new SuccessResponse({
                message: 'Motor deleted successfully!',
            }).send(res);
        } catch (error) {
            next(error);
        }
    };
}

module.exports = new ProductController();
