/*
  Warnings:

  - You are about to alter the column `desc` on the `accessories` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `date` on the `order` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `accessoriesId` on the `orderline` table. All the data in the column will be lost.
  - You are about to alter the column `expiredAt` on the `payment` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dob` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `cartitem` DROP FOREIGN KEY `cartItem_accessoriesId_fkey`;

-- DropForeignKey
ALTER TABLE `orderline` DROP FOREIGN KEY `orderLine_accessoriesId_fkey`;

-- AlterTable
ALTER TABLE `accessories` MODIFY `desc` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `cartitem` ADD COLUMN `accessoriesDetailId` INTEGER NULL;

-- AlterTable
ALTER TABLE `order` MODIFY `date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `orderline` DROP COLUMN `accessoriesId`,
    ADD COLUMN `accessoriesDetailId` INTEGER NULL;

-- AlterTable
ALTER TABLE `payment` MODIFY `expiredAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `dob` DATETIME NULL;

-- AddForeignKey
ALTER TABLE `cartItem` ADD CONSTRAINT `cartItem_accessoriesDetailId_fkey` FOREIGN KEY (`accessoriesDetailId`) REFERENCES `accessoriesDetail`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cartItem` ADD CONSTRAINT `cartItem_accessoriesId_fkey` FOREIGN KEY (`accessoriesId`) REFERENCES `accessories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderLine` ADD CONSTRAINT `orderLine_accessoriesDetailId_fkey` FOREIGN KEY (`accessoriesDetailId`) REFERENCES `accessoriesDetail`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
