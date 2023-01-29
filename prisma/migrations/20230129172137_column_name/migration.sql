/*
  Warnings:

  - You are about to drop the column `createdAt` on the `chapters` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `learning_paths` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `sections` table. All the data in the column will be lost.
  - You are about to drop the column `learningPathId` on the `sections` table. All the data in the column will be lost.
  - The primary key for the `sections_to_tutorials` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `sectionId` on the `sections_to_tutorials` table. All the data in the column will be lost.
  - You are about to drop the column `tutorialId` on the `sections_to_tutorials` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `tutorials` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `resetPasswordExpire` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `resetPasswordToken` on the `users` table. All the data in the column will be lost.
  - Added the required column `section_id` to the `sections_to_tutorials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tutorial_id` to the `sections_to_tutorials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `sections` DROP FOREIGN KEY `sections_learningPathId_fkey`;

-- DropForeignKey
ALTER TABLE `sections_to_tutorials` DROP FOREIGN KEY `sections_to_tutorials_sectionId_fkey`;

-- DropForeignKey
ALTER TABLE `sections_to_tutorials` DROP FOREIGN KEY `sections_to_tutorials_tutorialId_fkey`;

-- AlterTable
ALTER TABLE `chapters` DROP COLUMN `createdAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `learning_paths` DROP COLUMN `createdAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `sections` DROP COLUMN `createdAt`,
    DROP COLUMN `learningPathId`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `learning_path_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `sections_to_tutorials` DROP PRIMARY KEY,
    DROP COLUMN `sectionId`,
    DROP COLUMN `tutorialId`,
    ADD COLUMN `section_id` INTEGER NOT NULL,
    ADD COLUMN `tutorial_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`section_id`, `tutorial_id`);

-- AlterTable
ALTER TABLE `tutorials` DROP COLUMN `createdAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `users` DROP COLUMN `createdAt`,
    DROP COLUMN `firstName`,
    DROP COLUMN `lastName`,
    DROP COLUMN `resetPasswordExpire`,
    DROP COLUMN `resetPasswordToken`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `first_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `last_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `reset_password_expire` DATETIME(3) NULL,
    ADD COLUMN `reset_password_token` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `sections` ADD CONSTRAINT `sections_learning_path_id_fkey` FOREIGN KEY (`learning_path_id`) REFERENCES `learning_paths`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sections_to_tutorials` ADD CONSTRAINT `sections_to_tutorials_section_id_fkey` FOREIGN KEY (`section_id`) REFERENCES `sections`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sections_to_tutorials` ADD CONSTRAINT `sections_to_tutorials_tutorial_id_fkey` FOREIGN KEY (`tutorial_id`) REFERENCES `tutorials`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
