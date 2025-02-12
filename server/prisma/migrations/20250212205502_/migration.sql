-- AlterTable
ALTER TABLE "Likes" ADD COLUMN     "Userid" INTEGER;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_Userid_fkey" FOREIGN KEY ("Userid") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
