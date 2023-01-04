/*
  Warnings:

  - You are about to drop the column `chapterId` on the `section` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `section` DROP FOREIGN KEY `Section_chapterId_fkey`;

-- AlterTable
ALTER TABLE `section` DROP COLUMN `chapterId`;
