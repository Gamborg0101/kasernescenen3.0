'use server';
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';
import * as csvFormat from '@fast-csv/format';
import { error } from 'console';
import { resolve } from 'dns';
import { rejects } from 'assert';

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
//Promise<uvaekaBooking[]>

// function getValues(): Promise<uvaekaBooking[]> {
//   // const UVAEKAInfo: uvaekaBooking[] = [];
//   // const myPromise = new Promise((resolve, reject) => {
//   //   fs.createReadStream(path.resolve(__dirname, '../public', 'timetable.csv'))
//   //     .pipe(csv.parse({ headers: true }))
//   //     .on('error', (error) => reject('Something went wrong'))
//   //     .on('data', (row) => UVAEKAInfo.push(row))
//   //     .on('end', () => resolve(UVAEKAInfo));
//   // });

//   // return myPromise;
// }
// console.log(getValues());

async function createBookingFromCsv() {}
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
