import { User } from '../../brugere/BrugerTabel';
import { UpdateUser } from '../../brugere/Actions';
import { useState } from 'react';

type Props = {
  onClose: () => void;
  user: User;
};

export default function ChangeUserModal({ onClose, user }: Props) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [studentNumber, setStudentNumber] = useState(user.studentNumber);
  const [cardNumber, setCardNumber] = useState(user.cardNumber);
  const [category, setCategory] = useState(user.category);

  function SetClassName() {
    return 'w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-4';
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    //Grunden til undefined er, at prisma forventer undefined, men ts returner null.
    await UpdateUser(user.id, {
      firstName: firstName ?? undefined,
      lastName: lastName ?? undefined,
      phone: phone ?? undefined,
      email: email ?? undefined,
      studentNumber: studentNumber ?? undefined,
      cardNumber: cardNumber ?? undefined,
      category: category ?? undefined,
    });
    onClose();
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

              <form onSubmit={handleSubmit}>
                <label htmlFor="">Id</label>
                <input
                  type="text"
                  placeholder="Id"
                  defaultValue={user.id}
                  className={SetClassName() + ' bg-gray-200 cursor-not-allowed'}
                  readOnly
                />
                <label htmlFor="">Fornavn</label>
                <input
                  type="text"
                  className={SetClassName()}
                  placeholder="Fornavn"
                  defaultValue={user.firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                <label htmlFor="">Efternavn</label>

                <input
                  type="text"
                  className={SetClassName()}
                  defaultValue={user.lastName}
                  onChange={(e) => {
                    setlastName(e.target.value);
                  }}
                />
                <label htmlFor="">Telefon</label>
                <input
                  type="text"
                  placeholder="Telefon"
                  className={SetClassName()}
                  defaultValue={user.phone}
                  onChange={(e) => {
                    setPhone(Number(e.target.value));
                  }}
                />
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  placeholder="email"
                  className={SetClassName()}
                  defaultValue={user.email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <label htmlFor="">Studentnummer</label>
                <input
                  type="text"
                  placeholder="Studentnummer"
                  className={SetClassName()}
                  defaultValue={user.studentNumber}
                  onChange={(e) => {
                    setStudentNumber(Number(e.target.value));
                  }}
                />
                <label htmlFor="">Kortnummer</label>
                <input
                  type="text"
                  placeholder="Kortnummer"
                  className={SetClassName()}
                  defaultValue={user.cardNumber}
                  onChange={(e) => {
                    setCardNumber(Number(e.target.value));
                  }}
                />
                <label htmlFor="">Afdeling</label>
                <select
                  name="afdelinger"
                  id="departments"
                  className={SetClassName()}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  <option defaultValue="æk">Æstetik og kultur</option>
                  <option defaultValue="musikvidenskab">Musikvidenskab</option>
                  <option defaultValue="kunsthistorie">Kunsthistorie</option>
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
