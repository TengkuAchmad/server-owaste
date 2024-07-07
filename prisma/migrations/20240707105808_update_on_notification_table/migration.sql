/*
  Warnings:

  - You are about to drop the column `UUID_UA` on the `Notification` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Notification` DROP FOREIGN KEY `Notification_UUID_UA_fkey`;

-- AlterTable
ALTER TABLE `Notification` DROP COLUMN `UUID_UA`;
