'use server';
export function convertStartAndEndHour(
  startHour: string,
  endHour: number,
  endHourMins: string,
  getDate: string,
): { start: Date; end: Date } {
  const endTimeWithMins = `${endHour}:${endHourMins}`;

  const startFormatted = `${startHour.split('.')[0]}:${startHour.split('.')[1]}`;

  const startTime = new Date(`${getDate} ${startFormatted}`);
  const endTime = new Date(`${getDate} ${endTimeWithMins}`);

  return { start: startTime, end: endTime };
}
