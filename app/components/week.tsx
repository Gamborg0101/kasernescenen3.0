import { eachDayOfInterval, getWeek } from 'date-fns';

function CurrentWeek() {
  const start = new Date();
  const end = new Date().setDate(start.getDate() + 6);

  return eachDayOfInterval({
    start,
    end,
  });
}

export default function Week() {
  CurrentWeek();
  return <div></div>;
}
