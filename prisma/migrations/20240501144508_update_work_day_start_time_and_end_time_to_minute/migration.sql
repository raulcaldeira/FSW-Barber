/*
  Warnings:

  - The `startTime` column on the `working_days` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `endTime` column on the `working_days` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "working_days" DROP COLUMN "startTime",
ADD COLUMN     "startTime" INTEGER,
DROP COLUMN "endTime",
ADD COLUMN     "endTime" INTEGER;
