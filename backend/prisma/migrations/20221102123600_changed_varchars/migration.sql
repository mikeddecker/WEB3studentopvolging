/*
  Warnings:

  - You are about to alter the column `code` on the `Student` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(45)`.
  - You are about to alter the column `gebruikersNaam` on the `Student` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(45)`.
  - You are about to alter the column `familieNaam` on the `Student` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(45)`.
  - You are about to alter the column `voorNaam` on the `Student` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(45)`.
  - You are about to alter the column `sorteerNaam` on the `Student` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(90)`.

*/
-- AlterTable
ALTER TABLE `Opdracht` MODIFY `naam` VARCHAR(512) NOT NULL;

-- AlterTable
ALTER TABLE `OpdrachtElement` MODIFY `beschrijving` VARCHAR(4096) NOT NULL;

-- AlterTable
ALTER TABLE `Student` MODIFY `code` VARCHAR(45) NOT NULL,
    MODIFY `gebruikersNaam` VARCHAR(45) NOT NULL,
    MODIFY `familieNaam` VARCHAR(45) NOT NULL,
    MODIFY `voorNaam` VARCHAR(45) NOT NULL,
    MODIFY `sorteerNaam` VARCHAR(90) NOT NULL;
