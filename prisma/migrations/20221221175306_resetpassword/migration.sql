-- AlterTable
ALTER TABLE `user` ADD COLUMN `resetPasswordExpire` DATETIME(3) NULL,
    ADD COLUMN `resetPasswordToken` VARCHAR(191) NULL;
