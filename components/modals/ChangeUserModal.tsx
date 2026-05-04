import { User } from '@/generated/prisma';
import { UpdateUser } from '@/lib/actions/userActions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
  const [study, setStudy] = useState(user.study);
  const [role, setRole] = useState(user.role);
  const router = useRouter();

  const getClassName =
    'w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-4';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    //undefined da prisma forventer undefined, men ts returner null.
    await UpdateUser(user.id, {
      firstName: firstName ?? undefined,
      lastName: lastName ?? undefined,
      phone: phone ?? undefined,
      email: email ?? undefined,
      studentNumber: studentNumber ?? undefined,
      cardNumber: cardNumber ?? undefined,
      study: study ?? undefined,
      role: role ?? undefined,
    });
    router.refresh();
    onClose();
  }

  return (
    <div className="relative">
      <div
        className="fixed inset-0 bg-black/60  z-1 select-none bg-opacity-10 flex items-center justify-center"
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
              <h2 className="text-2xl font-semibold mb-2 text-center">Ændre bruger</h2>

              <form onSubmit={handleSubmit}>
                <label htmlFor="id">Id</label>
                <input
                  type="text"
                  name="id"
                  placeholder="Id"
                  defaultValue={user.id}
                  className={getClassName + ' bg-gray-200 cursor-not-allowed'}
                  readOnly
                />
                <label htmlFor="firstName">Fornavn</label>
                <input
                  type="text"
                  name="firstName"
                  className={getClassName}
                  placeholder="Fornavn"
                  defaultValue={user.firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                <label htmlFor="lastName">Efternavn</label>
                <input
                  type="text"
                  name="lastName"
                  className={getClassName}
                  defaultValue={user.lastName}
                  onChange={(e) => {
                    setlastName(e.target.value);
                  }}
                />
                <label htmlFor="phone">Telefon</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Telefon"
                  className={getClassName}
                  defaultValue={user.phone}
                  onChange={(e) => {
                    setPhone(Number(e.target.value));
                  }}
                />
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder="email"
                  className={getClassName}
                  defaultValue={user.email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <label htmlFor="studentNumber">Studentnummer</label>
                <input
                  type="text"
                  name="studentNumber"
                  placeholder="Studentnummer"
                  className={getClassName}
                  defaultValue={user.studentNumber}
                  onChange={(e) => {
                    setStudentNumber(Number(e.target.value));
                  }}
                />
                <label htmlFor="cardNumber">Kortnummer</label>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Kortnummer"
                  className={getClassName}
                  defaultValue={user.cardNumber}
                  onChange={(e) => {
                    setCardNumber(Number(e.target.value));
                  }}
                />
                <label htmlFor="afdeling">Afdeling</label>
                <select
                  name="afdeling"
                  id="departments"
                  className={getClassName}
                  onChange={(e) => {
                    setStudy(e.target.value);
                  }}
                >
                  <option value="">Vælg en afdeling</option>
                  <option value="æk">Æstetik og kultur</option>
                  <option value="musikvidenskab">Musikvidenskab</option>
                  <option value="kunsthistorie">Kunsthistorie</option>
                </select>

                <label htmlFor="role">Rolle</label>
                <select
                  name="role"
                  id="role"
                  className={getClassName}
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                >
                  <option value="">Vælg en rolle</option>
                  <option value="studerende">Studerende</option>
                  <option value="superbruger">Superbruger</option>
                  <option value="admin">Admin</option>
                </select>

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
