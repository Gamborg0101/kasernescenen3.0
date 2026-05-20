'use client';

import { P } from '@upstash/redis/error-8y4qG0W2';

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
export default async function importCsv() {
  const res = await fetch('/timetable.csv');
  const text = await res.text();

  const splittedValues = text.split(',');
  const categories = splittedValues.slice(0, 19);
  const values = splittedValues.slice(20);

  const table = categories.map((item, index) => ({
    item,
    value: values[index],
  }));

  console.log(table);
}
