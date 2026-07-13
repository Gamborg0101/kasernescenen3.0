export function convertStartAndEndHour(
  startHour: string,
  endHour: number,
  endHourMins: string,
  getDate: string,
): { start: Date; end: Date } {
  const start = new Date(`${getDate}T${startHour}:00`);

  const end = new Date(`${getDate}T${String(endHour).padStart(2, '0')}:${endHourMins}:00`);

  return {
    start,
    end,
  };
}
