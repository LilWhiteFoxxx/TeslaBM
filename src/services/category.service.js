'use strict';

const prisma = require('../dbs/db');
const { BadRequestError } = require('../core/error.response');

class CategoryService {
    static getAllCategory = async (limit = 50, offset = 0) => {
        const categories = await prisma.category.findMany({
            take: limit,
            skip: offset,
        });

        if (!categories || categories.length === 0) {
            throw new BadRequestError('No categories found!');
        }

        return categories;
    };

    static getAllCategoryOfAccessories = async (limit = 50, offset = 0) => {
        const motors = await prisma.motor.findMany({
            take: limit,
            skip: offset,
            select: {
                id: true,
                name: true,
            },
        });

        if (!motors || motors.length === 0) {
            throw new BadRequestError('No motors found!');
        }

        return motors;
    };
    // Create a new category
    static createCategory = async (name) => {
        if (!name) {
            throw new BadRequestError('Category name is required!');
        }

        const newCategory = await prisma.category.create({
            data: { name },
        });

        return newCategory;
    };

    // Update an existing category by id
    static updateCategory = async (id, name) => {
        if (!name) {
            throw new BadRequestError('Category name is required for update!');
        }

        const existingCategory = await prisma.category.findUnique({
            where: { id: Number(id) },
        });

        if (!existingCategory) {
            throw new BadRequestError('Category not found!');
        }

        const updatedCategory = await prisma.category.update({
            where: { id: Number(id) },
            data: { name },
        });

        return updatedCategory;
    };

    // Delete a category by id
    static deleteCategory = async (id) => {
        const existingCategory = await prisma.category.findUnique({
            where: { id: Number(id) },
        });

        if (!existingCategory) {
            throw new BadRequestError('Category not found!');
        }

        await prisma.category.delete({
            where: { id: Number(id) },
        });

        return { message: 'Category deleted successfully!' };
    };
}


module.exports = CategoryService;
