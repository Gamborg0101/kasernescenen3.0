export function convertStartAndEndHour(
  startHour: string,
  endHour: number,
  endHourMins: string,
  getDate: string,
): { start: Date; end: Date } {
  const startFormatted = `${startHour.split('.')[0]}:${startHour.split('.')[1]}`;
  const endTimeWithMins = `${endHour}:${endHourMins}`;

  const date = new Date(getDate);

  const startTime = new Date(date);
  startTime.setHours(Number(startFormatted.split(':')[0]), Number(startFormatted.split(':')[1]));

  const endTime = new Date(date);
  endTime.setHours(Number(endTimeWithMins.split(':')[0]), Number(endTimeWithMins.split(':')[1]));
  console.log({
    getDate,
    startFormatted,
    endTimeWithMins,
    startTime,
    endTime,
  });

  return { start: startTime, end: endTime };
}
