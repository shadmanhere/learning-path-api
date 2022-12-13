/*
  Warnings:

  - You are about to drop the `usercredentials` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `usercredentials` DROP FOREIGN KEY `UserCredentials_userId_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `usercredentials`;
