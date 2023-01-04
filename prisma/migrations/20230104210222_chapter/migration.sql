-- AlterTable
ALTER TABLE `section` ADD COLUMN `chapterId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Chapter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `title` VARCHAR(191) NOT NULL,
    `url_start` VARCHAR(191) NOT NULL,
    `url_end` VARCHAR(191) NOT NULL,
    `image_url` VARCHAR(191) NOT NULL,
    `tutorial_id` INTEGER NULL,

    UNIQUE INDEX `Chapter_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Section` ADD CONSTRAINT `Section_chapterId_fkey` FOREIGN KEY (`chapterId`) REFERENCES `Chapter`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chapter` ADD CONSTRAINT `Chapter_tutorial_id_fkey` FOREIGN KEY (`tutorial_id`) REFERENCES `Tutorial`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
