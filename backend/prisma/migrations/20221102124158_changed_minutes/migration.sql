/*
  Warnings:

  - You are about to alter the column `minuten` on the `OpdrachtElement` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(5,2)`.
  - You are about to alter the column `extraMinuten` on the `Rapport` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(5,2)`.

*/
-- AlterTable
ALTER TABLE `OpdrachtElement` MODIFY `minuten` DECIMAL(5, 2) NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `Rapport` MODIFY `extraMinuten` DECIMAL(5, 2) NOT NULL DEFAULT 0;
