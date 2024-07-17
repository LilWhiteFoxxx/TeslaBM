/*
  Warnings:

  - You are about to drop the column `accessoriesId` on the `cartitem` table. All the data in the column will be lost.
  - You are about to alter the column `date` on the `order` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `expiredAt` on the `payment` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dob` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `cartitem` DROP FOREIGN KEY `cartItem_accessoriesId_fkey`;

-- AlterTable
ALTER TABLE `cartitem` DROP COLUMN `accessoriesId`;

-- AlterTable
ALTER TABLE `order` MODIFY `date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `payment` MODIFY `expiredAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `dob` DATETIME NULL;
