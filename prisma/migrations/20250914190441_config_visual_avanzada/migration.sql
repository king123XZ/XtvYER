-- AlterTable
ALTER TABLE "ConfiguracionVisual" ADD COLUMN "backup" TEXT;
ALTER TABLE "ConfiguracionVisual" ADD COLUMN "banner" TEXT;
ALTER TABLE "ConfiguracionVisual" ADD COLUMN "enlacesRapidos" TEXT;
ALTER TABLE "ConfiguracionVisual" ADD COLUMN "favicon" TEXT;
ALTER TABLE "ConfiguracionVisual" ADD COLUMN "fuente" TEXT;
ALTER TABLE "ConfiguracionVisual" ADD COLUMN "idioma" TEXT;
ALTER TABLE "ConfiguracionVisual" ADD COLUMN "metaDescripcion" TEXT;
ALTER TABLE "ConfiguracionVisual" ADD COLUMN "metaKeywords" TEXT;
ALTER TABLE "ConfiguracionVisual" ADD COLUMN "openGraphImg" TEXT;
ALTER TABLE "ConfiguracionVisual" ADD COLUMN "themeColor" TEXT;
ALTER TABLE "ConfiguracionVisual" ADD COLUMN "tituloPagina" TEXT;

-- CreateTable
CREATE TABLE "CarruselImagen" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "orden" INTEGER NOT NULL DEFAULT 0,
    "creadoEn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
