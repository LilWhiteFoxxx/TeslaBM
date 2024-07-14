/*
  Warnings:

  - You are about to alter the column `slug` on the `motor` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `date` on the `order` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `expiredAt` on the `payment` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dob` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[slug]` on the table `motor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mfg` to the `motor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `accessoriesdetail` MODIFY `colorId` INTEGER NULL;

-- AlterTable
ALTER TABLE `motor` ADD COLUMN `mfg` VARCHAR(4) NOT NULL,
    MODIFY `slug` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `order` MODIFY `date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `payment` MODIFY `expiredAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `dob` DATETIME NULL;

-- CreateIndex
CREATE UNIQUE INDEX `motor_slug_key` ON `motor`(`slug`);
