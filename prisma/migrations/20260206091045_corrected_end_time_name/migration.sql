/*
  Warnings:

  - You are about to drop the column `endTiem` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "endTiem",
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL;
