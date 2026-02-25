import { signIn } from '@/auth/authSetup';
import { SUPPORTED_TEST_RUNNERS_LIST } from 'next/dist/cli/next-test';
import Image from 'next/image';

export function Login() {
  const studensAndRooms = [
    {
      who: 'Musikvidenskabsstuderende',
      what: 'Øvelokaler og læsesal',
    },
    {
      who: 'Dramaturgistuderende',
      what: 'Lille sal og læsesal',
    },
    { who: 'Øvrige studerende', what: 'Lokaler i læsesalen' },
  ];

  const regler = [
    'Personligt affald er den enkeltes ansvar.',
    'Oprydning og bortskaffelse af affald efter arrangementer påhviler arrangørerne.',
    'Undervisningslokaler skal efterlades ryddeligt med stolene sat op ved dagens afslutning.',
    'Fester og fredagsbar må kun afholdes fredage.',
    'Ad hoc-reservationer til undervisning har førsteprioritet og kan medføre flytning af studenteraktiviteter.',
  ];

  return (
    <div className="min-h-screen bg-stone-50 font-serif">
      <div className="max-w-5xl mx-auto px-8 py-16">
        {/* Hero */}
        <div className="mb-4 pb-4">
          <h1
            className="text-5xl text-stone-900 leading-tight mb-6"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Kasernescenens
            <br />
            Lokaleportal
          </h1>
          <p className="text-stone-600 text-lg max-w-xl leading-relaxed">
            Her kan studerende på Kaserneområdet oprette login og reservere
            lokaler i studenterhuset og fagenes brugerrum.
          </p>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: info column */}
          <div className="lg:col-span-2 space-y-10">
            {/* Who can book what */}
            <div>
              <h2 className="text-xs tracking-widest uppercase text-stone-400 mb-4 border-b border-stone-200 pb-2">
                Hvem kan booke hvad
              </h2>
              <div className="space-y-3">
                {studensAndRooms.map(({ who, what }) => (
                  <div
                    key={who}
                    className="flex gap-4 items-start py-3 border-b border-stone-100"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-2 shrink-0"></div>
                    <div>
                      <p className="text-stone-800 font-medium text-sm">
                        {who}
                      </p>
                      <p className="text-stone-500 text-sm">{what}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact & rules */}
            <div>
              <h2 className="text-xs tracking-widest uppercase text-stone-400 mb-4 border-b border-stone-200 pb-2">
                Kontakt & forespørgsler
              </h2>
              <div className="space-y-3 text-sm text-stone-600 leading-relaxed">
                <p>
                  <span className="text-stone-800 font-medium">
                    Undervisning, prøver og eksaminer
                  </span>
                  <br />
                  Studieadministrationen for Arts:{' '}
                  <a
                    href="mailto:team2.uvaeka.arts@au.dk"
                    className="underline decoration-stone-300 hover:text-stone-900"
                  >
                    team2.uvaeka.arts@au.dk
                  </a>
                </p>
                <p>
                  <span className="text-stone-800 font-medium">
                    Faglige aktiviteter (ad hoc)
                  </span>
                  <br />
                  <a
                    href="mailto:lokaler.kasernen@cc.au.dk"
                    className="underline decoration-stone-300 hover:text-stone-900"
                  >
                    lokaler.kasernen@cc.au.dk
                  </a>
                </p>
                <p>
                  <span className="text-stone-800 font-medium">
                    Øvrige forespørgelser:
                  </span>
                  <br />
                  <a
                    href="mailto:cg@cc.au.dk"
                    className="underline decoration-stone-300 hover:text-stone-900"
                  >
                    cg@cc.au.dk
                  </a>
                </p>
              </div>
            </div>

            {/* Praktisk */}
            <div>
              <h2 className="text-xs tracking-widest uppercase text-stone-400 mb-4 border-b border-stone-200 pb-2">
                Praktiske regler
              </h2>
              <ul className="space-y-2 text-sm text-stone-600">
                {regler.map((rule) => (
                  <li key={rule} className="flex gap-3 items-start">
                    <span className="text-stone-300 mt-0.5">—</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-stone-400 mt-4">
                Glemte sager kan indleveres i bygning 1580, ved
                lokalsekretariatet
              </p>
            </div>
          </div>

          {/* Right: login card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-white border border-stone-200 rounded-sm p-8 shadow-sm">
              <h2 className="text-xs tracking-widest uppercase text-stone-400 mb-6 pb-2 border-b border-stone-100">
                Log ind
              </h2>
              <p className="text-sm text-stone-500 mb-8 leading-relaxed">
                Brug din AU-Google-konto for at få adgang til
                reservationssystemet.
              </p>

              <form
                action={async () => {
                  'use server';
                  await signIn('google');
                }}
              >
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-stone-200 bg-white hover:bg-stone-50 hover:border-stone-300 transition-colors duration-150 text-sm text-stone-700 rounded-sm"
                >
                  <Image
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    loading="lazy"
                    alt="Google logo"
                    width={18}
                    height={18}
                  />
                  <span>Fortsæt med Google</span>
                </button>
              </form>

              <p className="text-xs text-stone-400 mt-6 leading-relaxed">
                Kun studerende og ansatte med en{' '}
                <span className="text-stone-500">@au.dk</span>-konto kan logge
                ind.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
