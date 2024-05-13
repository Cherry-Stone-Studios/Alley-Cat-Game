-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "username" VARCHAR(25) NOT NULL,
    "email" VARCHAR(75) NOT NULL,
    "password" VARCHAR(250) NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "nyan_unlocked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scores" (
    "id" SERIAL NOT NULL,
    "value" INTEGER NOT NULL,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,

    CONSTRAINT "scores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "base00" TEXT NOT NULL,
    "idle01" TEXT NOT NULL,
    "idle02" TEXT NOT NULL,
    "idle03" TEXT NOT NULL,
    "hurt01" TEXT NOT NULL,
    "death01" TEXT NOT NULL,
    "death02" TEXT NOT NULL,
    "death03" TEXT NOT NULL,
    "death04" TEXT NOT NULL,
    "attack01" TEXT NOT NULL,
    "attack02" TEXT NOT NULL,
    "attack03" TEXT NOT NULL,
    "run00" TEXT NOT NULL,
    "run01" TEXT NOT NULL,
    "run02" TEXT NOT NULL,
    "run03" TEXT NOT NULL,
    "run04" TEXT NOT NULL,
    "run05" TEXT NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_friends" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_friends_AB_unique" ON "_friends"("A", "B");

-- CreateIndex
CREATE INDEX "_friends_B_index" ON "_friends"("B");

-- AddForeignKey
ALTER TABLE "scores" ADD CONSTRAINT "scores_name_fkey" FOREIGN KEY ("name") REFERENCES "user"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_friends" ADD CONSTRAINT "_friends_A_fkey" FOREIGN KEY ("A") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_friends" ADD CONSTRAINT "_friends_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
