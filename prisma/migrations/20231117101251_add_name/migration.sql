-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" TEXT,
ALTER COLUMN "firstname" DROP NOT NULL,
ALTER COLUMN "lastname" DROP NOT NULL;
