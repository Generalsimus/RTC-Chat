-- CreateTable
CREATE TABLE "ModelsList" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "message" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ModelsList_name_key" ON "ModelsList"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ModelsList_message_key" ON "ModelsList"("message");
