type Props = {
  onClose: () => void;
};
export default function Modal({ onClose }: Props) {
  function SetClassName() {
    return 'w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500';
  }

  return (
    <div>
      <div
        className="modal fixed inset-0 bg-black bg-opacity-50 "
        onClick={onClose}
      >
        <div className="overlay fixed inset-0 bg-opacity-50 flex items-center justify-center">
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
  );
}
