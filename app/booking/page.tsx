import WeekAndHours from '../components/WeekAndHours';
import WeekSelector from '@/app/components/WeekSelector';
export default function bookingPage() {
  return (
    <div>
      <WeekSelector />
      <WeekAndHours />
    </div>
  );
}
