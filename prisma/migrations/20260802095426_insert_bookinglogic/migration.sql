CREATE EXTENSION IF NOT EXISTS btree_gist;

  ALTER TABLE "Booking" ADD CONSTRAINT booking_logic
    EXCLUDE USING GIST (
      "roomId" WITH =,
      tsrange("startTime", "endTime") WITH && );