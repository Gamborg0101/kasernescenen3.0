-- DropIndex
DROP INDEX "Room_id_key";

-- AlterTable
CREATE SEQUENCE room_id_seq;
ALTER TABLE "Room" ALTER COLUMN "id" SET DEFAULT nextval('room_id_seq');
ALTER SEQUENCE room_id_seq OWNED BY "Room"."id";
