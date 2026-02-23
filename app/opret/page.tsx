export default function Opret() {
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Opret bruger
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <div className="space-y-2">
                    <label
                      htmlFor="firstName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Fornavn
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Peter"
                      required
                    />
                  </div>
                  <div className="mt-4">
                    <label
                      htmlFor="lastName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Efternavn
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Jensen"
                      required
                    />
                  </div>

                  <div className="mt-4">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="AUxxxxxx@post.au.dk"
                      required
                    />
                  </div>

                  <div className="mt-4">
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Telefon
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="22446688"
                      required
                    />
                  </div>
                  <div className="mt-4">
                    <label
                      htmlFor="studyNumber"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Studienummer
                    </label>
                    <input
                      type="text"
                      name="studyNumber"
                      id="studyNumber"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="2016001234"
                      required
                    />
                  </div>
                  <div className="mt-4">
                    <label
                      htmlFor="study"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Studie
                    </label>
                    <select
                      name="studie"
                      id=""
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="">Vælg et studie</option>
                      <option value="musikvidenskab">Musikvidenskab</option>
                      <option value="dramaturgi">Dramaturgi</option>
                      <option value="æstetik_og_kultur">
                        Æstetik og Kultur
                      </option>
                      <option value="litteraturhistorie">
                        Litteraturhistorie
                      </option>
                    </select>
                  </div>

                  <div className="mt-4">
                    <label
                      htmlFor="cardNumber"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Kortnummer
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      id="cardNumber"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="123456"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit" //Mangler funktion
                  className="w-full bg-indigo-600 text-white rounded-md py-2 hover:bg-indigo-700 transition mt-2"
                >
                  Opret bruger
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
