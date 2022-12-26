-- CreateTable
CREATE TABLE `Groep` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `naam` VARCHAR(191) NOT NULL,
    `aanmaakDatum` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `geldig` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Student` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(255) NOT NULL,
    `gebruikersNaam` VARCHAR(45) NOT NULL,
    `familieNaam` VARCHAR(45) NOT NULL,
    `voorNaam` VARCHAR(45) NOT NULL,
    `sorteerNaam` VARCHAR(90) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `aanmaakDatum` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `geldig` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GroepStudent` (
    `groepId` INTEGER NOT NULL,
    `studentId` INTEGER NOT NULL,
    `aanmaakDatum` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `geldig` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`groepId`, `studentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Opdracht` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `naam` VARCHAR(512) NOT NULL,
    `aanmaakDatum` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `geldig` INTEGER NOT NULL DEFAULT 1,

    UNIQUE INDEX `Opdracht_naam_key`(`naam`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OpdrachtElement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `beschrijving` VARCHAR(4096) NOT NULL,
    `minuten` DECIMAL(5, 2) NOT NULL DEFAULT 1,
    `aanmaakDatum` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `geldig` INTEGER NOT NULL DEFAULT 1,
    `opdrachtId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rapport` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` INTEGER NOT NULL DEFAULT 0,
    `extraMinuten` DECIMAL(5, 2) NOT NULL DEFAULT 0,
    `aanmaakDatum` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `geldig` INTEGER NOT NULL DEFAULT 1,
    `studentId` INTEGER NOT NULL,
    `opdrachtElementId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VraagStudent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `beschrijving` VARCHAR(191) NOT NULL,
    `aanmaakDatum` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `geldig` INTEGER NOT NULL DEFAULT 1,
    `rapportId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GroepStudent` ADD CONSTRAINT `GroepStudent_groepId_fkey` FOREIGN KEY (`groepId`) REFERENCES `Groep`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GroepStudent` ADD CONSTRAINT `GroepStudent_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OpdrachtElement` ADD CONSTRAINT `OpdrachtElement_opdrachtId_fkey` FOREIGN KEY (`opdrachtId`) REFERENCES `Opdracht`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rapport` ADD CONSTRAINT `Rapport_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rapport` ADD CONSTRAINT `Rapport_opdrachtElementId_fkey` FOREIGN KEY (`opdrachtElementId`) REFERENCES `OpdrachtElement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VraagStudent` ADD CONSTRAINT `VraagStudent_rapportId_fkey` FOREIGN KEY (`rapportId`) REFERENCES `Rapport`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
