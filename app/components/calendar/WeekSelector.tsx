type WeekProps = {
  nextWeek: () => void;
  prevWeek: () => void;
  currentWeek: () => void;
};

const btnStyle = 'bg-gray-400 h-10 w-50 hover:bg-gray-400/90 shadow-md';

export default function WeekSelector({
  nextWeek,
  prevWeek,
  currentWeek,
}: WeekProps) {
  return (
    <div className="gap-10 bg flex justify-center items-center">
      <button className={btnStyle} onClick={prevWeek}>
        <p>{'<<'}</p>
      </button>
      <button className={btnStyle} onClick={currentWeek}>
        <p>Denne uge</p>
      </button>
      <button className={btnStyle} onClick={nextWeek}>
        <p>{'>>'}</p>
      </button>
    </div>
  );
}
