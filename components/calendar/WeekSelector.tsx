type WeekProps = {
  nextWeek: () => void;
  prevWeek: () => void;
  currentWeek: () => void;
  weekCounter: Date;
};

export default function WeekSelector({ nextWeek, prevWeek, currentWeek, weekCounter }: WeekProps) {
  console.log(weekCounter);
  return (
    <div className=" grid grid-cols-3 gap-4 bg-white rounded-r-2xl rounded-l-2xl shadow-md w-70">
      <div className="flex justify-center items-center h-12">
        <button className="flex items-center justify-center h-4 w-6 text-sm" onClick={prevWeek}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="cursor-pointer">
            <path
              fill-rule="evenodd"
              d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className="flex justify-center items-center flex-row ">
        <button onClick={currentWeek}>
          <p className=" whitespace-nowrap cursor-pointer capitalize text-sm">
            {weekCounter.toLocaleDateString('da-DK', {
              weekday: 'long',
              day: 'numeric',
              month: '2-digit',
              year: 'numeric',
            })}
          </p>
        </button>
      </div>
      <div className="flex justify-center items-center ">
        <button className="flex items-center justify-center w-6 text-sm" onClick={nextWeek}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="cursor-pointer">
            <path
              fillRule="evenodd"
              d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
