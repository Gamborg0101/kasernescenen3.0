import { Navbar } from '../components/navbar';
import Week from '../components/week';
import weekSelector from '@/app/components/WeekSelector';
import WeekSelector from '@/app/components/WeekSelector';
export default function bookingPage() {
  return (
    <div>
      <Navbar />
      <Week />
      <WeekSelector />
    </div>
  );
}

/*
 * Week skal tage et input - start på uge
 * Multiple weeks skal tage input - start på uge
 * Det givende input skal kunne styres via en knap
 *
 * To do
 *   Lav knap
 *   Få den til at coneole.log dagens dato som går op og ned.
 *
 *
 *
 *
 * */
