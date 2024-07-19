/*
  Warnings:

  - You are about to alter the column `total` on the `order` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `expiredAt` on the `payment` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dob` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `order` MODIFY `total` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `payment` MODIFY `expiredAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `dob` DATETIME NULL;
