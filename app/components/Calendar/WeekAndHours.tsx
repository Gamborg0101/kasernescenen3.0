import {
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  eachMinuteOfInterval,
} from 'date-fns';
import React from 'react';
import { useState } from 'react';

type Props = {
  selectedWeek: Date;
};

function SetClassName() {
  return 'w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500';
}

function ShowModal() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      {modal && (
        <div>
          <button onClick={toggleModal}>Open</button>
          <div className="modal fixed inset-0 bg-black bg-opacity-50 ">
            <div
              className="overlay fixed inset-0 bg-opacity-50 flex items-center justify-center"
              onClick={toggleModal}
            >
              <div
                className="modal-content"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <div className="bg-white rounded-xl w-80 p-6 relative shadow-lg">
                  <div className="flex flex-row-reverse">
                    <button
                      className=" w-6 h-6 bg-indigo-600 text-white rounded-md py-2 hover:bg-indigo-700 transition flex justify-center items-center"
                      onClick={toggleModal}
                    >
                      x
                    </button>
                  </div>
                  <h2 className="text-2xl font-semibold mb-2 text-center">
                    Book et lokale
                  </h2>

                  <form action="">
                    <input
                      type="text"
                      placeholder="lokale"
                      className={SetClassName()}
                    />
                    <input
                      type="text"
                      placeholder="starttid"
                      className={SetClassName()}
                    />
                    <input
                      type="text"
                      placeholder="sluttid"
                      className={SetClassName()}
                    />
                    <input
                      type="text"
                      placeholder="brugernavn"
                      className={SetClassName()}
                    />
                    <input
                      type="text"
                      placeholder="au_mail"
                      className={SetClassName()}
                    />
                    <input
                      type="phone"
                      placeholder="telefon"
                      className={SetClassName()}
                    />
                    <select
                      name="afdelinger"
                      id="departments"
                      className={SetClassName()}
                    >
                      <option value="æk">Æstetik og kultur</option>
                      <option value="musikvidenskab">Musikvidenskab</option>
                      <option value="kunsthistorie">kunsthistorie</option>
                    </select>
                    <input type="phone" />
                    <button
                      type="submit"
                      className="w-full bg-indigo-600 text-white rounded-md py-2 hover:bg-indigo-700 transition"
                    >
                      Book
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <button onClick={toggleModal}>Open</button>
    </>
  );
}

function CreateWeek({ selectedWeek }: Props) {
  const currentDate = selectedWeek;

  const start = startOfWeek(currentDate, { weekStartsOn: 1 });
  const end = endOfWeek(currentDate, { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start, end });
  const week = days.map((day) => ({
    day,
    hours: CreateHoursForDay(day),
  }));
  return week;
}

function CreateHoursForDay(day: Date) {
  const start = new Date(day);
  start.setHours(0, 0, 0, 0);

  const end = new Date(day);
  end.setHours(23, 45, 0, 0);

  return eachMinuteOfInterval({ start, end }, { step: 15 });
}

function createID(currentDate: Date) {
  const date = currentDate.toLocaleDateString('de-DE');
  const time = currentDate.toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return `${date}-${time}`;
}

export default function WeekAndHours(selectedWeek: Props) {
  const fullWeek = CreateWeek(selectedWeek);

  function printer(event: React.MouseEvent<HTMLElement>): void {
    const target = event.target as HTMLElement;
    console.log(target.id);
  }
  return (
    <div>
      <ShowModal />
      <div className="flex gap-10 ">
        {fullWeek.map((week, index) => (
          <div key={index}>
            {week.day.toLocaleDateString('de-DE')}
            <div
              onClick={(event: React.MouseEvent<HTMLElement>) => printer(event)}
            >
              {week.hours.map((hour, index) => (
                <div key={index} id={createID(hour)}>
                  {hour.toLocaleTimeString('de-DE')}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
