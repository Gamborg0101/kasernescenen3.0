import { start } from 'node:repl';

type Props = {
  onClose: () => void;
  roomNumber: number;
  startHour: string;
};

export default function CreateBookingModal({
  onClose,
  roomNumber,
  startHour,
}: Props) {
  function SetClassName() {
    return 'w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500';
  }

  return (
    <div>
      <div
        className="fixed inset-0 bg-black/60 flex items-center justify-center"
        onClick={onClose}
      >
        <div>
          <div
            className="modal-content"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="bg-white rounded-xl w-80 p-6 relative shadow-lg">
              <div className="flex flex-row-reverse">
                <button
                  className="w-6 h-6 bg-indigo-600 text-white rounded-md py-2 hover:bg-indigo-700 transition flex justify-center items-center"
                  onClick={onClose}
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
                  className={SetClassName() + ' ' + 'bg-gray-300'}
                  value={roomNumber}
                  readOnly
                />
                <input
                  type="text"
                  placeholder="dato"
                  className={SetClassName()}
                  value={startHour ? startHour.split('-')[0] : ''}
                />
                <input
                  type="text"
                  placeholder="starttid"
                  className={SetClassName()}
                  value={startHour ? startHour.split('-')[1] : ''}
                  readOnly
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
  );
}
