/*
  Warnings:

  - You are about to drop the column `UUID_UA` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `UUID_UA` on the `VoucherUser` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[UUID_UD]` on the table `VoucherUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `UUID_UD` to the `VoucherUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Notification` DROP FOREIGN KEY `Notification_UUID_UA_fkey`;

-- DropForeignKey
ALTER TABLE `VoucherUser` DROP FOREIGN KEY `VoucherUser_UUID_UA_fkey`;

-- AlterTable
ALTER TABLE `Notification` DROP COLUMN `UUID_UA`,
    ADD COLUMN `UUID_UD` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `VoucherUser` DROP COLUMN `UUID_UA`,
    ADD COLUMN `UUID_UD` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `TransactionData` (
    `UUID_TD` VARCHAR(191) NOT NULL,
    `UUID_UD` VARCHAR(191) NOT NULL,
    `UUID_VU` VARCHAR(191) NOT NULL,
    `Type_TD` VARCHAR(191) NOT NULL,
    `Amount_TD` DOUBLE NOT NULL,
    `Status_TD` VARCHAR(191) NOT NULL DEFAULT 'Pending',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`UUID_TD`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `VoucherUser_UUID_UD_key` ON `VoucherUser`(`UUID_UD`);

-- AddForeignKey
ALTER TABLE `VoucherUser` ADD CONSTRAINT `VoucherUser_UUID_UD_fkey` FOREIGN KEY (`UUID_UD`) REFERENCES `UserData`(`UUID_UD`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionData` ADD CONSTRAINT `TransactionData_UUID_UD_fkey` FOREIGN KEY (`UUID_UD`) REFERENCES `UserData`(`UUID_UD`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionData` ADD CONSTRAINT `TransactionData_UUID_VU_fkey` FOREIGN KEY (`UUID_VU`) REFERENCES `VoucherUser`(`UUID_VU`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_UUID_UD_fkey` FOREIGN KEY (`UUID_UD`) REFERENCES `UserData`(`UUID_UD`) ON DELETE SET NULL ON UPDATE CASCADE;
