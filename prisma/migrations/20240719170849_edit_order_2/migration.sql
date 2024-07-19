/*
  Warnings:

  - You are about to drop the column `date` on the `order` table. All the data in the column will be lost.
  - You are about to alter the column `expiredAt` on the `payment` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dob` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `date`;

-- AlterTable
ALTER TABLE `payment` MODIFY `expiredAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `dob` DATETIME NULL;
