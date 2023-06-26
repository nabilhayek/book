
## Om projektet

Projektet jag har utvecklat är en omfattande applikation som implementerar modern och ny teknologi, såsom NestJS, GraphQL, NextJS, Prisma och TypeScript. Applikationen demonstrerar också konceptet RBAC (Rollbaserad åtkomstkontroll) och autentisering med JSON Web Token. Projektet använder PostgreSQL tillsammans med Docker för databasmiljö.

På hemsidan finns det möjlighet att logga in och registrera sig. Sessionslängden är satt till 1 minut för teständamål. Hemsidan implementerar säkra rutter som endast är tillgängliga för inloggade användare. Här kan användaren se en lista över alla användare samt sin egen profil. Administratörsanvändare har befogenhet att lägga till och ta bort användare.

Applikationen hanterar hashning och kryptering av lösenord för att säkerställa att användardata alltid är skyddad. Dessutom har applikationen utformats för att motverka välkända sårbarheter och attacker genom att rätt konfigurera HTTP-rubriker. Åtgärder har även vidtagits för att förhindra CORS-attacker och belastningsbegränsning för att skydda servern mot intrångsförsök.

På front-end-sidan använder jag anpassade hooks som bygger på GraphQL-hooks och även anpassade komponenter från mitt egna framtida UI-bibliotek.

Projektet är i dagsläget under utveckling.
## Kom igång

- Installera Docker.
- Klona projektet från GitHub.
- Byt till dev-grenen (branch) i projektet.
- Installera paket genom att köra kommandot yarn i roten av projektet, samt i mapparna ```/server``` och ```/client```.
- Starta projektet genom att navigera till roten av projektet och skriva kommandot ```yarn start:all```.
- Applicera migrations genom att köra kommandot npx prisma migrate dev i mappen ```/server```.
Besök sidan:
- Använd webbläsaren och navigera till ```localhost:3000```.
## Installation

Install my-project with npm

```bash
  npm install my-project
  cd my-project
```

## Inloggningsuppgifter

För att logga in och testa applikationen kan du använda följande användare:

Användare med administratörsbehörigheter: 
```
admin@example.com
password
```

Användare med standardprivilegier:
```
user@example.com
password
```

Du kan även skapa nya användare via gränssnittet som har standardprivilegier per standard.

## Ändra användardata i databasen

För att lätt experimentera och ändra datan i databasen kan du köra kommandot:
```
yarn start:prisma
```

Kommandot kommer att öppna ett gränssnitt via Prisma som tillåter dig att göra ändringar hos användare. T.ex ge användaren ny roll eller namn.