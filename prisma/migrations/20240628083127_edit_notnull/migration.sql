/*
  Warnings:

  - You are about to drop the column `expireAt` on the `session` table. All the data in the column will be lost.
  - Added the required column `expiredAt` to the `session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `session` DROP COLUMN `expireAt`,
    ADD COLUMN `expiredAt` DATE NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `firstName` VARCHAR(50) NULL,
    MODIFY `lastName` VARCHAR(50) NULL,
    MODIFY `avatar` VARCHAR(255) NULL,
    MODIFY `gender` VARCHAR(6) NULL,
    MODIFY `dob` DATE NULL,
    MODIFY `roleId` INTEGER NOT NULL DEFAULT 2,
    MODIFY `updatedAt` DATETIME(3) NULL;
