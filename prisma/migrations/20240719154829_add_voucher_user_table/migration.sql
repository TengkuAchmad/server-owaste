/*
  Warnings:

  - Added the required column `UUID_VU` to the `TransactionData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TransactionData` ADD COLUMN `UUID_VU` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `VoucherUser` (
    `UUID_VU` VARCHAR(191) NOT NULL,
    `UUID_UD` VARCHAR(191) NOT NULL,
    `UUID_VD` VARCHAR(191) NOT NULL,
    `isUsed_VU` BOOLEAN NOT NULL DEFAULT false,
    `Code_VU` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VoucherUser_UUID_VD_key`(`UUID_VD`),
    UNIQUE INDEX `VoucherUser_Code_VU_key`(`Code_VU`),
    PRIMARY KEY (`UUID_VU`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `VoucherUser` ADD CONSTRAINT `VoucherUser_UUID_UD_fkey` FOREIGN KEY (`UUID_UD`) REFERENCES `UserData`(`UUID_UD`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VoucherUser` ADD CONSTRAINT `VoucherUser_UUID_VD_fkey` FOREIGN KEY (`UUID_VD`) REFERENCES `VoucherData`(`UUID_VD`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionData` ADD CONSTRAINT `TransactionData_UUID_VU_fkey` FOREIGN KEY (`UUID_VU`) REFERENCES `VoucherUser`(`UUID_VU`) ON DELETE RESTRICT ON UPDATE CASCADE;
