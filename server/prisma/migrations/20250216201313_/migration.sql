/*
  Warnings:

  - A unique constraint covering the columns `[postId,userId,commentId]` on the table `Likes` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Likes_postId_userId_key";

-- AlterTable
ALTER TABLE "Likes" ADD COLUMN     "commentId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Likes_postId_userId_commentId_key" ON "Likes"("postId", "userId", "commentId");

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
