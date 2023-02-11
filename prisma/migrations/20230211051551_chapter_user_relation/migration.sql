/*
  Warnings:

  - You are about to drop the column `chapter_id` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_chapter_id_fkey`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `chapter_id`;

-- CreateTable
CREATE TABLE `chapters_to_users` (
    `chapter_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`chapter_id`, `user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `chapters_to_users` ADD CONSTRAINT `chapters_to_users_chapter_id_fkey` FOREIGN KEY (`chapter_id`) REFERENCES `chapters`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chapters_to_users` ADD CONSTRAINT `chapters_to_users_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
