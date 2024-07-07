/*
  Warnings:

  - You are about to drop the column `isGlobal_NF` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `isRead_NF` on the `Notification` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Notification` DROP COLUMN `isGlobal_NF`,
    DROP COLUMN `isRead_NF`,
    ADD COLUMN `isSent_NF` BOOLEAN NOT NULL DEFAULT false;
