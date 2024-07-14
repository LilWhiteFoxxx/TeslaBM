/*
  Warnings:

  - You are about to drop the column `accessoriesDetailId` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `motorDetailId` on the `images` table. All the data in the column will be lost.
  - You are about to alter the column `date` on the `order` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `expiredAt` on the `payment` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dob` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `images` DROP FOREIGN KEY `images_accessoriesDetailId_fkey`;

-- DropForeignKey
ALTER TABLE `images` DROP FOREIGN KEY `images_motorDetailId_fkey`;

-- AlterTable
ALTER TABLE `images` DROP COLUMN `accessoriesDetailId`,
    DROP COLUMN `motorDetailId`,
    ADD COLUMN `accessoriesId` INTEGER NULL,
    ADD COLUMN `motorId` INTEGER NULL;

-- AlterTable
ALTER TABLE `order` MODIFY `date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `payment` MODIFY `expiredAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `dob` DATETIME NULL;

-- AddForeignKey
ALTER TABLE `images` ADD CONSTRAINT `images_motorId_fkey` FOREIGN KEY (`motorId`) REFERENCES `motor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `images` ADD CONSTRAINT `images_accessoriesId_fkey` FOREIGN KEY (`accessoriesId`) REFERENCES `accessories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
