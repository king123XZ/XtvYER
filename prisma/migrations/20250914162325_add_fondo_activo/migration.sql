-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ConfiguracionVisual" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "imagenFondo" TEXT,
    "videoFondo" TEXT,
    "colorPrincipal" TEXT,
    "fondoActivo" TEXT NOT NULL DEFAULT 'ninguno',
    "logo" TEXT,
    "actualizado" DATETIME NOT NULL
);
INSERT INTO "new_ConfiguracionVisual" ("actualizado", "colorPrincipal", "id", "imagenFondo", "videoFondo") SELECT "actualizado", "colorPrincipal", "id", "imagenFondo", "videoFondo" FROM "ConfiguracionVisual";
DROP TABLE "ConfiguracionVisual";
ALTER TABLE "new_ConfiguracionVisual" RENAME TO "ConfiguracionVisual";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
