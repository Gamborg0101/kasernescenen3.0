import { SUPPORTED_TEST_RUNNERS_LIST } from 'next/dist/cli/next-test';
import type User from '../brugere/brugertabel';

type Props = {
  onClose: () => void;
};

export default function ChangeUserModal({
  onClose,
  user,
}: Props & { user: User }) {
  function SetClassName() {
    return 'w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-4';
  }

  return (
    <div>
      <div
        className="fixed inset-0 bg-opacity-10 flex items-center justify-center  z-50"
        onClick={onClose}
      >
        <div className="">
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
                Ændre bruger
              </h2>

              <form action="">
                <label htmlFor="">Fornavn</label>
                <input
                  type="text"
                  className={SetClassName()}
                  placeholder="Fornavn"
                  value={user.firstName}
                />
                <label htmlFor="">Efternavn</label>

                <input
                  type="text"
                  className={SetClassName()}
                  value={user.lastName}
                />
                <label htmlFor="">Telefon</label>
                <input
                  type="text"
                  placeholder="Telefon"
                  className={SetClassName()}
                  value={user.phone}
                />
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  placeholder="email"
                  className={SetClassName()}
                  value={user.email}
                />
                <label htmlFor="">Studentnummer</label>
                <input
                  type="text"
                  placeholder="Studentnummer"
                  className={SetClassName()}
                  value={user.studentNumber}
                />
                <label htmlFor="">Kortnummer</label>
                <input
                  type="text"
                  placeholder="Kortnummer"
                  className={SetClassName()}
                  value={user.cardNumber}
                />
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  placeholder="AUmail"
                  className={SetClassName()}
                  value={user.auMail}
                />
                <select
                  name="afdelinger"
                  id="departments"
                  className={SetClassName()}
                >
                  <option value="æk">Æstetik og kultur</option>
                  <option value="musikvidenskab">Musikvidenskab</option>
                  <option value="kunsthistorie">Kunsthistorie</option>
                </select>
                <input type="phone" />
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white rounded-md py-2 hover:bg-indigo-700 transition"
                >
                  Ændre bruger
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
