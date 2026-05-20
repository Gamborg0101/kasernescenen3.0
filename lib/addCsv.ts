'use server';
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';
import * as csvFormat from '@fast-csv/format';

type uvaekaBooking = {
  beskrivelse: string;
  startUgeISO: number;
  startUge: string;
  startDag: string;
  startDato: string;
  startTid: string;
  slutdag: string;
  slutdato: string;
  sluttid: string;
  varighed: string;
  type: string;
  underviser: string;
  lokale: string;
  hold: string;
  fakultet: string;
  størrelse: string;
  noter: string;
  draft: boolean;
  videokonference: boolean;
};
export default async function importCsv(): Promise<uvaekaBooking[]> {
  return new Promise((resolve, reject) => {
    const rows: uvaekaBooking[] = [];

    fs.createReadStream(path.resolve(__dirname, '../public', 'timetable.csv'))
      .pipe(csv.parse({ headers: true }))
      .on('error', (error) => reject(error))
      .on('data', (row: uvaekaBooking) => rows.push(row))
      .on('end', (rowCount: number) => {
        console.log(`Parsed ${rowCount} rows`);
        resolve(rows);
      });
  });
}

async function createBookingFromCsv() {
  const data = await importCsv();
  csvFormat.format();
  data.map((item, index) => {
    item;
  });

  console.log(data);
}
/*
DATA FORMAT:
export async function createBooking({ roomId, startTime, endTime, userId, reason }: CreateBooking) {
  await prisma.booking.create({
    data: {
      roomId: roomId,
      startTime: startTime,
      endTime: endTime,
      userId: userId,
      reason: reason,
    },
  });
}

*/

createBookingFromCsv();
