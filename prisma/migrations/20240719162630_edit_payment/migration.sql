/*
  Warnings:

  - You are about to drop the column `paymentId` on the `order` table. All the data in the column will be lost.
  - You are about to alter the column `date` on the `order` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `expiredAt` on the `payment` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dob` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `paymentMethodId` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `order_paymentId_fkey`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `paymentId`,
    ADD COLUMN `paymentMethodId` INTEGER NOT NULL,
    MODIFY `date` DATETIME NOT NULL,
    MODIFY `addressId` INTEGER NULL;

-- AlterTable
ALTER TABLE `payment` MODIFY `expiredAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `dob` DATETIME NULL;

-- CreateTable
CREATE TABLE `paymentMethod` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_paymentMethodId_fkey` FOREIGN KEY (`paymentMethodId`) REFERENCES `paymentMethod`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
