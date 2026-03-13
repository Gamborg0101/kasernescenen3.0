Stack:

- NEXTjs
- Typescript
- React
- Tailwind CSS
- Postgresql
- Prisma - online DB - login

Authentication:

- Auth.js
  user, moderator and admin

Få lavet:
bookingActions.ts
userActions.ts
roomActions.ts

under app/lib/actions/filerne

Få slettet de mærkelige actionpages der allerede er.

---

Husk på - actions er til for at validere vores data.
Så request fra client side går ind til actions, som validere brugeren og input, og hvis den kommer igennem, så sender den request til DB - og så revalider den også siden bagefter.

Forskellen mellem action og page er, at page henter data til visning, kører ved sidelæsning.
Det er jeg eksempelvis skal bruge getUser() (den er jo serverside), og så kan jeg sende den som en prop til et view. Men vi kan også renderer JSX i en page, hvis skal kun sende dataen videre, hvis vores page er en component, og vi skal bruge props i næste view.
page.tsx henter data til visning ved sideindlæsning.

Jeg kan enten:

1. Rendere JSX direkte i page.tsx (ingen interaktivitet nødvendig) (fortrukken)
2. Sende data som props til en Client Component
   (når jeg har brug for interaktivitet som onClick, useState osv.)

Brugertabel - jeg tror, at jeg kan få lavet den mere simpel, hvis jeg putter tingene ned i objekter.

DB-laget (/lib/db/) er det nederste lag. Her bor alle dine Prisma-kald — både get, create, update og delete. Dette lag ved ingenting om validering eller hvem der kalder det. Det er bare rene database-funktioner.

Actions (/lib/actions/) bruges når en bruger gør noget — opretter, sletter eller ændrer data. Her modtager du bruger-input, validerer det med fx Zod, og kalder derefter DB-laget. Actions eksisterer kun fordi du ikke må stole på bruger-input uden at tjekke det først.

page.tsx er en async Server Component der kører på serveren. Den kalder DB-laget direkte for at hente data, og sender det ned til dine client components som props. Ingen validering nødvendig her, fordi der ikke er noget bruger-input involveret.

Client Components (/components/) er dine views. De modtager data som props fra page.tsx, kan have useState og håndtere bruger-interaktion. Når brugeren trykker på en knap der ændrer noget, kalder de en Action.

Tommelfingerreglen er:
Vil du vise data → page.tsx henter fra DB-laget
Vil du ændre data → Client Component kalder en Action, der validerer og kalder DB-laget
