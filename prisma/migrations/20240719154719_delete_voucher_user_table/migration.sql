/*
  Warnings:

  - You are about to drop the column `UUID_VU` on the `TransactionData` table. All the data in the column will be lost.
  - You are about to drop the `VoucherUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `TransactionData` DROP FOREIGN KEY `TransactionData_UUID_VU_fkey`;

-- DropForeignKey
ALTER TABLE `VoucherUser` DROP FOREIGN KEY `VoucherUser_UUID_UD_fkey`;

-- DropForeignKey
ALTER TABLE `VoucherUser` DROP FOREIGN KEY `VoucherUser_UUID_VD_fkey`;

-- AlterTable
ALTER TABLE `TransactionData` DROP COLUMN `UUID_VU`;

-- DropTable
DROP TABLE `VoucherUser`;
