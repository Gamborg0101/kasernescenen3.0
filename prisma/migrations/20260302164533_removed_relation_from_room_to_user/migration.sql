/*
  Warnings:

  - You are about to drop the column `bookingId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `roomId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_roomId_fkey";

-- DropIndex
DROP INDEX "Booking_bookingId_key";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "bookingId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "roomId";
