/*
  Warnings:

  - You are about to drop the `category_to_learning_path` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `category_to_tutorial` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `category_to_learning_path` DROP FOREIGN KEY `category_to_learning_path_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `category_to_learning_path` DROP FOREIGN KEY `category_to_learning_path_learning_path_id_fkey`;

-- DropForeignKey
ALTER TABLE `category_to_tutorial` DROP FOREIGN KEY `category_to_tutorial_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `category_to_tutorial` DROP FOREIGN KEY `category_to_tutorial_tutorial_id_fkey`;

-- DropTable
DROP TABLE `category_to_learning_path`;

-- DropTable
DROP TABLE `category_to_tutorial`;

-- CreateTable
CREATE TABLE `categories_to_learning_paths` (
    `category_id` INTEGER NOT NULL,
    `learning_path_id` INTEGER NOT NULL,

    PRIMARY KEY (`category_id`, `learning_path_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories_to_tutorials` (
    `category_id` INTEGER NOT NULL,
    `tutorial_id` INTEGER NOT NULL,

    PRIMARY KEY (`category_id`, `tutorial_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `categories_to_learning_paths` ADD CONSTRAINT `categories_to_learning_paths_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `categories_to_learning_paths` ADD CONSTRAINT `categories_to_learning_paths_learning_path_id_fkey` FOREIGN KEY (`learning_path_id`) REFERENCES `learning_paths`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `categories_to_tutorials` ADD CONSTRAINT `categories_to_tutorials_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `categories_to_tutorials` ADD CONSTRAINT `categories_to_tutorials_tutorial_id_fkey` FOREIGN KEY (`tutorial_id`) REFERENCES `tutorials`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
