/*
  Warnings:

  - You are about to drop the `_Friends` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Friends" DROP CONSTRAINT "_Friends_A_fkey";

-- DropForeignKey
ALTER TABLE "_Friends" DROP CONSTRAINT "_Friends_B_fkey";

-- DropTable
DROP TABLE "_Friends";

-- CreateTable
CREATE TABLE "friends" (
    "friendsId" INTEGER NOT NULL,
    "friendsOfId" INTEGER NOT NULL,

    CONSTRAINT "friends_pkey" PRIMARY KEY ("friendsId","friendsOfId")
);

-- AddForeignKey
ALTER TABLE "friends" ADD CONSTRAINT "friends_friendsId_fkey" FOREIGN KEY ("friendsId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friends" ADD CONSTRAINT "friends_friendsOfId_fkey" FOREIGN KEY ("friendsOfId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
