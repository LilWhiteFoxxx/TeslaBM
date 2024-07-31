'use strict';

const MotorService = require('../services/motor.service');
const { OK, CREATED, SuccessResponse } = require('../core/success.response');

class MotorController {
    getAllMotorByCategory = async (req, res, next) => {
        try {
            const { categoryId, limit, offset } = req.query;
            const motors = await MotorService.getAllMotorByCategory(
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
            const motor = await MotorService.getMotorDetail(parseInt(id));
            new SuccessResponse({
                message: 'Get motor detail success!',
                metadata: motor,
            }).send(res);
        } catch (error) {
            next(error);
        }
    };

    getAllMotorDetail = async (req, res, next) => {
        try {
            const motors = await MotorService.getAllMotorDetail();
            new SuccessResponse({
                message: 'Get all motor detail success!',
                metadata: motors,
            }).send(res);
        } catch (error) {
            next(error);
        }
    };

    getAllMotor = async (req, res, next) => {
        try {
            const { limit, offset } = req.query;
            const motors = await MotorService.getAllMotor(
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

    getMotorById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const motor = await MotorService.getMotorById(parseInt(id));
            new SuccessResponse({
                message: 'Get motor success!',
                metadata: motor,
            }).send(res);
        } catch (error) {
            next(error);
        }
    };

    // Tạo một motor mới
    createMotor = async (req, res, next) => {
        try {
            const {
                name,
                desc,
                originalPrice,
                categoryId,
                mfg,
                img,
                imgHover,
                dataAndEquipment,
                motorDetails = [], // danh sách chi tiết motor để thêm
                images = [], // danh sách hình ảnh để thêm
            } = req.body;

            // Kiểm tra các thông tin cần thiết
            if (!name || !desc || !originalPrice || !categoryId || !mfg) {
                throw new BadRequestError(
                    'Name, desc, originalPrice, categoryId, and mfg are required!'
                );
            }

            // Gọi phương thức tạo motor từ ProductService
            const newMotor = await MotorService.createMotor(
                name,
                desc,
                parseFloat(originalPrice),
                parseInt(categoryId),
                mfg,
                img,
                imgHover,
                motorDetails,
                images,
                dataAndEquipment
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
            const { name, originalPrice, categoryId, colorId, mfg, quantity } =
                req.body;

            const motorId = parseInt(id);
            if (isNaN(motorId)) {
                throw new BadRequestError('Motor ID must be a number!');
            }

            const updatedMotor = await MotorService.updateMotor(
                motorId,
                name,
                originalPrice,
                categoryId,
                colorId,
                mfg,
                quantity
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

            await MotorService.deleteMotor(motorId);
            new SuccessResponse({
                message: 'Motor deleted successfully!',
            }).send(res);
        } catch (error) {
            next(error);
        }
    };
}

module.exports = new MotorController();
