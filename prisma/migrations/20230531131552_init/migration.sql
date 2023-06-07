/*
  Warnings:

  - You are about to drop the column `jenis_kelamin` on the `atlet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `atlet` DROP COLUMN `jenis_kelamin`,
    ADD COLUMN `jenisKelamin` VARCHAR(191) NULL;
