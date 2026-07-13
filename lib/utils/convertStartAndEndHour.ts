export function convertStartAndEndHour(
  startHour: string,
  endHour: number,
  endHourMins: string,
  getDate: string,
): { start: Date; end: Date } {
  const start = new Date(startHour);

  const end = new Date(start);
  end.setHours(endHour, Number(endHourMins), 0, 0);

  console.log({
    getDate,
    startHour,
    start,
    end,
  });

  return {
    start,
    end,
  };
}
