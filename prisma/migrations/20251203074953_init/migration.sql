-- AlterTable
ALTER TABLE "User" ADD COLUMN     "refreshToken" TEXT,
ALTER COLUMN "image" DROP NOT NULL;
