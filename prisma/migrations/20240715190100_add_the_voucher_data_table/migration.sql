-- CreateTable
CREATE TABLE `VoucherData` (
    `UUID_VD` VARCHAR(191) NOT NULL,
    `Title_VD` VARCHAR(191) NOT NULL,
    `Description_VD` TEXT NOT NULL,
    `Value_VD` DOUBLE NOT NULL,
    `Quota_VD` INTEGER NOT NULL,
    `Image_VD` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`UUID_VD`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VoucherUser` (
    `UUID_VU` VARCHAR(191) NOT NULL,
    `UUID_UA` VARCHAR(191) NULL,
    `UUID_VD` VARCHAR(191) NOT NULL,
    `isUsed_VU` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VoucherUser_UUID_UA_key`(`UUID_UA`),
    UNIQUE INDEX `VoucherUser_UUID_VD_key`(`UUID_VD`),
    PRIMARY KEY (`UUID_VU`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `VoucherUser` ADD CONSTRAINT `VoucherUser_UUID_UA_fkey` FOREIGN KEY (`UUID_UA`) REFERENCES `UserAccount`(`UUID_UA`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VoucherUser` ADD CONSTRAINT `VoucherUser_UUID_VD_fkey` FOREIGN KEY (`UUID_VD`) REFERENCES `VoucherData`(`UUID_VD`) ON DELETE RESTRICT ON UPDATE CASCADE;
