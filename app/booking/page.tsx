import { Navbar } from '../components/Navbar';
import Week from '../components/Week';
import WeekSelector from '@/app/components/WeekSelector';
export default function bookingPage() {
  return (
    <div>
      <Navbar />
      <WeekSelector />
      <Week />
    </div>
  );
}
