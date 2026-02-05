export default function brugere() {
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
          <tr>
            <td className="border border-gray-300 px-4 py-2">Ole Hansen</td>
            <td className="border border-gray-300 px-4 py-2">Ole</td>
            <td className="border border-gray-300 px-4 py-2">21842190 </td>
            <td className="border border-gray-300 px-4 py-2">
              ole.hansen@email.com
            </td>
            <td className="border border-gray-300 px-4 py-2">20201291</td>
            <td className="border border-gray-300 px-4 py-2">432817</td>
            <td className="border border-gray-300 px-4 py-2">Det er Ole</td>
            <td className="border border-gray-300 px-4 py-2">Admin </td>
            <td className="border border-gray-300 flex items-center justify-center px-4 py-2">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                Ændre
              </button>
            </td>
            <td className="border border-gray-300 flex items-center justify-center  px-4 py-2">
              <button className="flex justify-center items-center bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                Slet
              </button>
            </td>
          </tr>
          <tr className="bg-gray-100">
            <td className="border border-gray-300 px-4 py-2">Anna Larsen</td>
            <td className="border border-gray-300 px-4 py-2">Anna</td>
            <td className="border border-gray-300 px-4 py-2">22883377</td>
            <td className="border border-gray-300 px-4 py-2">
              anna.larsen@email.com
            </td>
            <td className="border border-gray-300 px-4 py-2">20192812 </td>
            <td className="border border-gray-300 px-4 py-2">382719 </td>
            <td className="border border-gray-300 px-4 py-2">Niels er sød </td>
            <td className="border border-gray-300 px-4 py-2">It Ingeniør</td>
            <td className="border border-gray-300 flex items-center justify-center px-4 py-2">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                Ændre
              </button>
            </td>
            <td className="border border-gray-300 flex items-center justify-center  px-4 py-2">
              <button className="flex justify-center items-center bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                Slet
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
