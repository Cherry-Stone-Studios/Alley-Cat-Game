/*
  Warnings:

  - You are about to drop the column `attack01` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `attack02` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `attack03` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `base00` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `death01` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `death02` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `death03` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `death04` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `hurt01` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `idle01` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `idle02` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `idle03` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `run00` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `run01` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `run02` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `run03` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `run04` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `run05` on the `images` table. All the data in the column will be lost.
  - Added the required column `sprite` to the `images` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "scores" DROP CONSTRAINT "scores_name_fkey";

-- AlterTable
ALTER TABLE "images" DROP COLUMN "attack01",
DROP COLUMN "attack02",
DROP COLUMN "attack03",
DROP COLUMN "base00",
DROP COLUMN "death01",
DROP COLUMN "death02",
DROP COLUMN "death03",
DROP COLUMN "death04",
DROP COLUMN "hurt01",
DROP COLUMN "idle01",
DROP COLUMN "idle02",
DROP COLUMN "idle03",
DROP COLUMN "run00",
DROP COLUMN "run01",
DROP COLUMN "run02",
DROP COLUMN "run03",
DROP COLUMN "run04",
DROP COLUMN "run05",
ADD COLUMN     "sprite" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "scores" ALTER COLUMN "name" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "scores" ADD CONSTRAINT "scores_name_fkey" FOREIGN KEY ("name") REFERENCES "user"("username") ON DELETE SET NULL ON UPDATE CASCADE;
