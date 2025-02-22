-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_postId_fkey";

-- AlterTable
ALTER TABLE "Likes" ALTER COLUMN "postId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
