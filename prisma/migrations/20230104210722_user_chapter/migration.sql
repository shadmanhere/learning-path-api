-- CreateTable
CREATE TABLE `_ChapterToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ChapterToUser_AB_unique`(`A`, `B`),
    INDEX `_ChapterToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ChapterToUser` ADD CONSTRAINT `_ChapterToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Chapter`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ChapterToUser` ADD CONSTRAINT `_ChapterToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
