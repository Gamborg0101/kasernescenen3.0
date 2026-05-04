'use client';
import { DeleteUser } from '@/lib/actions/userActions';
import React from 'react';
import ChangeUserModal from '@/components/modals/ChangeUserModal';
import { User } from '@/generated/prisma';

export default function UserList({ users }: { users: User[] }) {
  const [localUsers, setLocalUsers] = React.useState(users);
  const [toggleModal, setToggleModal] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  const handleDelete = async (userId: number) => {
    await DeleteUser(userId);
    setLocalUsers(localUsers.filter((user) => user.id !== userId));
  };

  return (
    <div className="bg-white border border-stone-100 shadow-sm rounded-2xl overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-stone-50 border-b border-stone-100">
            <th className="text-xs text-stone-400 uppercase tracking-wider font-medium px-5 py-3 text-left">Fornavn</th>
            <th className="text-xs text-stone-400 uppercase tracking-wider font-medium px-5 py-3 text-left">
              Efternavn
            </th>
            <th className="text-xs text-stone-400 uppercase tracking-wider font-medium px-5 py-3 text-left">Telefon</th>
            <th className="text-xs text-stone-400 uppercase tracking-wider font-medium px-5 py-3 text-left">Email</th>
            <th className="text-xs text-stone-400 uppercase tracking-wider font-medium px-5 py-3 text-left">
              Studienr.
            </th>
            <th className="text-xs text-stone-400 uppercase tracking-wider font-medium px-5 py-3 text-left">Kortnr.</th>
            <th className="text-xs text-stone-400 uppercase tracking-wider font-medium px-5 py-3 text-left">Note</th>
            <th className="text-xs text-stone-400 uppercase tracking-wider font-medium px-5 py-3 text-left">
              Kategori
            </th>
            <th className="text-xs text-stone-400 uppercase tracking-wider font-medium px-5 py-3 text-left">Rolle</th>
            <th className="px-5 py-3" />
          </tr>
        </thead>

        <tbody className="divide-y divide-stone-100">
          {localUsers.map((user) => (
            <tr key={user.id} className="hover:bg-stone-50 transition-colors duration-100">
              <td className="px-5 py-3 text-sm text-stone-800 font-medium">{user.firstName}</td>
              <td className="px-5 py-3 text-sm text-stone-800 font-medium">{user.lastName}</td>
              <td className="px-5 py-3 text-sm text-stone-600 font-mono">{user.phone}</td>
              <td className="px-5 py-3 text-sm text-stone-600">{user.email}</td>
              <td className="px-5 py-3 text-sm text-stone-300 font-mono">{user.studentNumber}</td>
              <td className="px-5 py-3 text-sm text-stone-300 font-mono">{user.cardNumber}</td>
              <td className="px-5 py-3 text-sm text-stone-500 italic">{user.note ?? '—'}</td>
              <td className="px-5 py-3 text-sm text-stone-600 capitalize">{user.study}</td>
              <td className="px-5 py-3">
                <span className="text-xs text-stone-500 bg-stone-100 px-2 py-1 rounded-lg capitalize font-medium">
                  {user.role}
                </span>
              </td>
              <td className="px-5 py-3">
                <div className="flex items-center justify-end gap-2">
                  <button
                    className="text-xs text-stone-400 hover:text-stone-800 hover:bg-stone-100 border border-stone-100 px-3 py-1.5 rounded-xl transition-colors duration-150 font-medium"
                    onClick={() => {
                      setSelectedUser(user);
                      setToggleModal(true);
                    }}
                  >
                    Ændre
                  </button>
                  <button
                    className="text-xs text-stone-400 hover:text-red-500 hover:bg-red-50 border border-stone-100 hover:border-red-100 px-3 py-1.5 rounded-xl transition-colors duration-150 font-medium"
                    onClick={() => handleDelete(user.id)}
                  >
                    Slet
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {toggleModal && selectedUser && <ChangeUserModal onClose={() => setToggleModal(false)} user={selectedUser} />}
    </div>
  );
}
