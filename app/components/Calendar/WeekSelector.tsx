type WeekProps = {
  nextWeek: () => void;
  prevWeek: () => void;
};

export default function WeekSelector({ nextWeek, prevWeek }: WeekProps) {
  return (
    <div className="flex gap-10 bg">
      <button className="bg-gray-400" onClick={nextWeek}>
        +1 week
      </button>
      <button className="bg-gray-400" onClick={prevWeek}>
        -1 week
      </button>
    </div>
  );
}
