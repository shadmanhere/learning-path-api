/*
  Warnings:

  - You are about to drop the `_sectiontotutorial` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_sectiontotutorial` DROP FOREIGN KEY `_SectionToTutorial_A_fkey`;

-- DropForeignKey
ALTER TABLE `_sectiontotutorial` DROP FOREIGN KEY `_SectionToTutorial_B_fkey`;

-- DropTable
DROP TABLE `_sectiontotutorial`;

-- CreateTable
CREATE TABLE `SectionToTutorial` (
    `sectionId` INTEGER NOT NULL,
    `tutorialId` INTEGER NOT NULL,

    PRIMARY KEY (`sectionId`, `tutorialId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SectionToTutorial` ADD CONSTRAINT `SectionToTutorial_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `Section`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SectionToTutorial` ADD CONSTRAINT `SectionToTutorial_tutorialId_fkey` FOREIGN KEY (`tutorialId`) REFERENCES `Tutorial`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
