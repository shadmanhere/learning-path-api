/*
  Warnings:

  - You are about to drop the column `url_end` on the `chapters` table. All the data in the column will be lost.
  - You are about to drop the column `url_start` on the `chapters` table. All the data in the column will be lost.
  - Added the required column `url` to the `chapters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `chapters` DROP COLUMN `url_end`,
    DROP COLUMN `url_start`,
    ADD COLUMN `url` VARCHAR(191) NOT NULL;
