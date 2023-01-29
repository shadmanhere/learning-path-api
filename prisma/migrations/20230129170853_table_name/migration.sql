/*
  Warnings:

  - You are about to drop the `_chaptertouser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `chapter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `learningpath` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `section` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sectiontotutorial` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tutorial` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_chaptertouser` DROP FOREIGN KEY `_ChapterToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_chaptertouser` DROP FOREIGN KEY `_ChapterToUser_B_fkey`;

-- DropForeignKey
ALTER TABLE `chapter` DROP FOREIGN KEY `Chapter_tutorial_id_fkey`;

-- DropForeignKey
ALTER TABLE `section` DROP FOREIGN KEY `Section_learningPathId_fkey`;

-- DropForeignKey
ALTER TABLE `sectiontotutorial` DROP FOREIGN KEY `SectionToTutorial_sectionId_fkey`;

-- DropForeignKey
ALTER TABLE `sectiontotutorial` DROP FOREIGN KEY `SectionToTutorial_tutorialId_fkey`;

-- DropTable
DROP TABLE `_chaptertouser`;

-- DropTable
DROP TABLE `chapter`;

-- DropTable
DROP TABLE `learningpath`;

-- DropTable
DROP TABLE `section`;

-- DropTable
DROP TABLE `sectiontotutorial`;

-- DropTable
DROP TABLE `tutorial`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `resetPasswordToken` VARCHAR(191) NULL,
    `resetPasswordExpire` DATETIME(3) NULL,
    `chapter_id` INTEGER NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `learning_paths` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `learning_paths_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sections` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `name` VARCHAR(191) NOT NULL,
    `learningPathId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tutorials` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `title` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `image_url` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tutorials_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sections_to_tutorials` (
    `sectionId` INTEGER NOT NULL,
    `tutorialId` INTEGER NOT NULL,

    PRIMARY KEY (`sectionId`, `tutorialId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chapters` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `title` VARCHAR(191) NOT NULL,
    `url_start` VARCHAR(191) NOT NULL,
    `url_end` VARCHAR(191) NOT NULL,
    `image_url` VARCHAR(191) NOT NULL,
    `tutorial_id` INTEGER NULL,

    UNIQUE INDEX `chapters_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_chapter_id_fkey` FOREIGN KEY (`chapter_id`) REFERENCES `chapters`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sections` ADD CONSTRAINT `sections_learningPathId_fkey` FOREIGN KEY (`learningPathId`) REFERENCES `learning_paths`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sections_to_tutorials` ADD CONSTRAINT `sections_to_tutorials_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `sections`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sections_to_tutorials` ADD CONSTRAINT `sections_to_tutorials_tutorialId_fkey` FOREIGN KEY (`tutorialId`) REFERENCES `tutorials`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chapters` ADD CONSTRAINT `chapters_tutorial_id_fkey` FOREIGN KEY (`tutorial_id`) REFERENCES `tutorials`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
