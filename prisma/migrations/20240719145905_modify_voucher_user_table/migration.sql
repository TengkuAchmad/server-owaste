/*
  Warnings:

  - A unique constraint covering the columns `[UUID_UD]` on the table `VoucherUser` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[UUID_VD]` on the table `VoucherUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `VoucherUser_UUID_UD_key` ON `VoucherUser`(`UUID_UD`);

-- CreateIndex
CREATE UNIQUE INDEX `VoucherUser_UUID_VD_key` ON `VoucherUser`(`UUID_VD`);
