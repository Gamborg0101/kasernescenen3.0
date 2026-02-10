'use client';
import { DeleteUser } from './Actions';
import React from 'react';
import ChangeUserModal from '../components/modals/ChangeUserModal';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  phone: number;
  email: string;
  studentNumber: number;
  cardNumber: number;
  note: string | null;
  category: string | null;
};

export default function BrugerTabel({ users }: { users: User[] }) {
  const [localUsers, setLocalUsers] = React.useState(users);
  const [toggleModal, setToggleModal] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  const handleDelete = async (userId: number) => {
    await DeleteUser(userId);
    setLocalUsers(localUsers.filter((user) => user.id !== userId));
  };

  return (
    <div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Fornavn</th>
            <th className="border border-gray-300 px-4 py-2">Efternavn</th>
            <th className="border border-gray-300 px-4 py-2">Telefon</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Studienummer</th>
            <th className="border border-gray-300 px-4 py-2">Kortnummer</th>
            <th className="border border-gray-300 px-4 py-2">Note</th>
            <th className="border border-gray-300 px-4 py-2">Kategori</th>
            <th className="border border-gray-300 px-4 py-2">Knap 1</th>
          </tr>
        </thead>
        <tbody>
          {localUsers.map((user, index) => (
            <tr key={user.id} className={index % 2 === 0 ? '' : 'bg-gray-100'}>
              <td className="border border-gray-300 px-4 py-2">
                {user.firstName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {user.lastName}
              </td>
              <td className="border border-gray-300 px-4 py-2">{user.phone}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">
                {user.studentNumber}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {user.cardNumber}
              </td>
              <td className="border border-gray-300 px-4 py-2">{user.note}</td>
              <td className="border border-gray-300 px-4 py-2">
                {user.category}
              </td>
              <td className="border border-gray-300 flex items-center justify-center px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                  onClick={() => {
                    setSelectedUser(user);
                    setToggleModal(true);
                  }}
                >
                  Ændre
                </button>
              </td>
              <td className="border border-gray-300 flex items-center justify-center px-4 py-2">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleDelete(user.id)}
                  type="submit"
                >
                  Slet
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {toggleModal && selectedUser && (
        <ChangeUserModal
          onClose={() => setToggleModal(false)}
          user={selectedUser}
        />
      )}
    </div>
  );
}
