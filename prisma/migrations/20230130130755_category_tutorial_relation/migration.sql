-- CreateTable
CREATE TABLE `category_to_tutorial` (
    `category_id` INTEGER NOT NULL,
    `tutorial_id` INTEGER NOT NULL,

    PRIMARY KEY (`category_id`, `tutorial_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `category_to_tutorial` ADD CONSTRAINT `category_to_tutorial_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `category_to_tutorial` ADD CONSTRAINT `category_to_tutorial_tutorial_id_fkey` FOREIGN KEY (`tutorial_id`) REFERENCES `tutorials`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
