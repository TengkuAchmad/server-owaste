/*
  Warnings:

  - Added the required column `Price_VD` to the `VoucherData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `VoucherData` ADD COLUMN `Price_VD` DOUBLE NOT NULL;
