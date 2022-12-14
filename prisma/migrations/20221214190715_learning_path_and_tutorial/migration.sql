-- CreateTable
CREATE TABLE `LearningPath` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `LearningPath_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tutorial` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `title` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `image_url` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Tutorial_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_LearningPathToTutorial` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_LearningPathToTutorial_AB_unique`(`A`, `B`),
    INDEX `_LearningPathToTutorial_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_LearningPathToTutorial` ADD CONSTRAINT `_LearningPathToTutorial_A_fkey` FOREIGN KEY (`A`) REFERENCES `LearningPath`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LearningPathToTutorial` ADD CONSTRAINT `_LearningPathToTutorial_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tutorial`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
