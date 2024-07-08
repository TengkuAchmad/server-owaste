/*
  Warnings:

  - Added the required column `Data_WS` to the `WebSocketClients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `WebSocketClients` ADD COLUMN `Data_WS` JSON NOT NULL;
