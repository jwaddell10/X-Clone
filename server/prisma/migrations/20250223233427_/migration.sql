/*
  Warnings:

  - A unique constraint covering the columns `[postId,userId,commentId]` on the table `Likes` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Likes_postId_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Likes_postId_userId_commentId_key" ON "Likes"("postId", "userId", "commentId");
