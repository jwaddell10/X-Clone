/*
  Warnings:

  - A unique constraint covering the columns `[postId,userId,commentId]` on the table `Likes` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_postId_fkey";

-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "postId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Likes_postId_userId_commentId_key" ON "Likes"("postId", "userId", "commentId");

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
