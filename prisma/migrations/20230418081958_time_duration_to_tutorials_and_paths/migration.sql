-- AlterTable
ALTER TABLE `learning_paths` ADD COLUMN `description` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `duration` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `tutorials` ADD COLUMN `description` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `duration` VARCHAR(191) NOT NULL DEFAULT '';
