/*
  Warnings:

  - You are about to alter the column `name` on the `scores` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(25)`.

*/
-- DropForeignKey
ALTER TABLE "scores" DROP CONSTRAINT "scores_name_fkey";

-- AlterTable
ALTER TABLE "scores" ALTER COLUMN "name" SET DATA TYPE VARCHAR(25);

-- AddForeignKey
ALTER TABLE "scores" ADD CONSTRAINT "scores_name_fkey" FOREIGN KEY ("name") REFERENCES "user"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
