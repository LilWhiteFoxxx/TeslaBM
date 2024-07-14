'use strict';

const CategoryService = require('../services/category.service');
const { OK, CREATED, SuccessResponse } = require('../core/success.response');

class CategoryController {
    getAllCategory = async (req, res, next) => {
        try {
            const { limit, offset } = req.query;
            const categories = await CategoryService.getAllCategory(
                parseInt(limit),
                parseInt(offset)
            );
            new SuccessResponse({
                message: 'Get all category success!',
                metadata: categories,
            }).send(res);
        } catch (error) {
            next(error);
        }
    };

    getAllCategoryOfAccessories = async (req, res, next) => {
        try {
            const { limit, offset } = req.query;
            const categories = await CategoryService.getAllCategoryOfAccessories(
                parseInt(limit),
                parseInt(offset)
            );
            new SuccessResponse({
                message: 'Get all category of accessories success!',
                metadata: categories,
            }).send(res);
        } catch (error) {
            next(error);
        }
    };

    // Create a new category
    createCategory = async (req, res, next) => {
        try {
            const { name } = req.body;

            if (!name) {
                throw new BadRequestError('Category name is required!');
            }

            const newCategory = await CategoryService.createCategory(name);
            new SuccessResponse(
                {
                    message: 'Category created successfully!',
                    metadata: newCategory,
                },
                CREATED
            ).send(res);
        } catch (error) {
            next(error);
        }
    };

    // Update an existing category by id
    updateCategory = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { name } = req.body;

            const categoryId = parseInt(id);
            if (isNaN(categoryId)) {
                throw new BadRequestError('Category ID must be a number!');
            }

            if (!name) {
                throw new BadRequestError(
                    'Category name is required for update!'
                );
            }

            const updatedCategory = await CategoryService.updateCategory(
                categoryId,
                name
            );
            new SuccessResponse({
                message: 'Category updated successfully!',
                metadata: updatedCategory,
            }).send(res);
        } catch (error) {
            next(error);
        }
    };

    // Delete a category by id
    deleteCategory = async (req, res, next) => {
        try {
            const { id } = req.params;

            const categoryId = parseInt(id);
            if (isNaN(categoryId)) {
                throw new BadRequestError('Category ID must be a number!');
            }

            await CategoryService.deleteCategory(categoryId);
            new SuccessResponse({
                message: 'Category deleted successfully!',
            }).send(res);
        } catch (error) {
            next(error);
        }
    };
}

module.exports = new CategoryController();
