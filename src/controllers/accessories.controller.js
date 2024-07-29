'use strict';

const AccessoriesService = require('../services/acesssories.service');
const { OK, CREATED, SuccessResponse } = require('../core/success.response');

class MotorController {
    getAllMotorByCategory = async (req, res, next) => {
        try {
            const { categoryId, limit, offset } = req.query;
            const motors = await AccessoriesService.getAllMotorByCategory(
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

    getAccessoriesDetail = async (req, res, next) => {
        try {
            const { id } = req.params;
            const accessories = await AccessoriesService.getAccessoriesDetail(
                parseInt(id)
            );
            new SuccessResponse({
                message: 'Get accessories detail success!',
                metadata: accessories,
            }).send(res);
        } catch (error) {
            next(error);
        }
    };

    getAllAcessories = async (req, res, next) => {
        try {
            const { limit, offset } = req.query;
            const motors = await AccessoriesService.getAllAcessories(
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

    getAllAccessoriesDetail = async (req, res, next) => {
        try {
            const accessories =
                await AccessoriesService.getAllAccessoriesDetail();
            new SuccessResponse({
                message: 'Get all accessories detail success!',
                metadata: accessories,
            }).send(res);
        } catch (error) {
            next(error);
        }
    };

    // Tạo một motor mới
    createAccessories = async (req, res, next) => {
        try {
            const {
                name,
                desc,
                originalPrice,
                motorId,
                mfg,
                img,
                imgHover,
                accessoriesDetails = [], // danh sách chi tiết motor để thêm
                images = [], // danh sách hình ảnh để thêm
            } = req.body;

            // Kiểm tra các thông tin cần thiết
            if (
                !name ||
                !desc ||
                !originalPrice ||
                !motorId ||
                !mfg ||
                !accessoriesDetails ||
                !images
            ) {
                throw new BadRequestError('Required!');
            }

            const newAcessories = await AccessoriesService.createAccessories(
                name,
                desc,
                parseFloat(originalPrice),
                parseInt(motorId),
                mfg,
                img,
                imgHover,
                accessoriesDetails,
                images
            );

            new SuccessResponse(
                {
                    message: 'Motor created successfully!',
                    metadata: newAcessories,
                },
                CREATED
            ).send(res);
        } catch (error) {
            next(error);
        }
    };

    updateAccessories = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { name, originalPrice, categoryId, colorId, mfg, quantity } =
                req.body;

            const accessoriesId = parseInt(id);
            if (isNaN(accessoriesId)) {
                throw new BadRequestError('Motor ID must be a number!');
            }

            const updatedAccessories = await AccessoriesService.updateAccessories(
                accessoriesId,
                name,
                originalPrice,
                categoryId,
                colorId,
                mfg,
                quantity
            );
            if (!updatedAccessories) {
                throw new BadRequestError('Motor not found!');
            }

            new SuccessResponse({
                message: 'Motor updated successfully!',
                metadata: updatedAccessories,
            }).send(res);
        } catch (error) {
            next(error);
        }
    };


    deleteAccessories = async (req, res, next) => {
        try {
            const { id } = req.params;

            const motorId = parseInt(id);
            if (isNaN(motorId)) {
                throw new BadRequestError('Motor ID must be a number!');
            }

            await AccessoriesService.deleteAccessories(motorId);
            new SuccessResponse({
                message: 'Accessories deleted successfully!',
            }).send(res);
        } catch (error) {
            next(error);
        }
    };
}

module.exports = new MotorController();
