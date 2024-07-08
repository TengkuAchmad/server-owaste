/*
  Warnings:

  - Added the required column `Category_NG` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Notification` ADD COLUMN `Category_NG` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `WebSocketClients` (
    `UUID_WSC` VARCHAR(191) NOT NULL,
    `UserUUID_WSC` VARCHAR(191) NOT NULL,
    `connectedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isConnected` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`UUID_WSC`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
