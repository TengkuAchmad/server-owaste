-- DropForeignKey
ALTER TABLE `VoucherUser` DROP FOREIGN KEY `VoucherUser_UUID_UD_fkey`;

-- DropIndex
DROP INDEX `VoucherUser_UUID_VD_key` ON `VoucherUser`;
