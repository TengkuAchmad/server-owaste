/*
  Warnings:

  - A unique constraint covering the columns `[Code_VU]` on the table `VoucherUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Code_VU` to the `VoucherUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `VoucherUser` ADD COLUMN `Code_VU` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `VoucherUser_Code_VU_key` ON `VoucherUser`(`Code_VU`);
