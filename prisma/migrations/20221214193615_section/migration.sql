/*
  Warnings:

  - You are about to drop the `_learningpathtotutorial` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_learningpathtotutorial` DROP FOREIGN KEY `_LearningPathToTutorial_A_fkey`;

-- DropForeignKey
ALTER TABLE `_learningpathtotutorial` DROP FOREIGN KEY `_LearningPathToTutorial_B_fkey`;

-- DropTable
DROP TABLE `_learningpathtotutorial`;

-- CreateTable
CREATE TABLE `Section` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `name` VARCHAR(191) NOT NULL,
    `learningPathId` INTEGER NULL,

    UNIQUE INDEX `Section_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_SectionToTutorial` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_SectionToTutorial_AB_unique`(`A`, `B`),
    INDEX `_SectionToTutorial_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Section` ADD CONSTRAINT `Section_learningPathId_fkey` FOREIGN KEY (`learningPathId`) REFERENCES `LearningPath`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SectionToTutorial` ADD CONSTRAINT `_SectionToTutorial_A_fkey` FOREIGN KEY (`A`) REFERENCES `Section`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SectionToTutorial` ADD CONSTRAINT `_SectionToTutorial_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tutorial`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
