# Test project til TV2, Henrik Riis
Dette projekt er lavet ud fra et standard react project,
der vil derfor forekomme ting som ikke har med opgaven at gøre.

## Projektet startes

Projektet 'clones' til download folder, og pakker skal herefter installeres, det er en forudsætning
at node.js er indstalleret på computeren.

### `npm start`

Kør app i development mode.<br>
Åbn i Google chrome [http://localhost:3000](http://localhost:3000)

Prøv at teste indsættelse af parametre i url adressen.<br>
Åbn i Google chrome [http://localhost:3000?city=Odense](http://localhost:3000?city=Odense)

I søgefeltet kan indtastes en hvilken som helst dansk by.<br>
Prøv f.eks. at skrive 'Ålborg', der skulle gerne komme et resultat.<br>

I appen er en funktion, som skriver den korrekte vindretning ud fra 'grad' tallet, som kan læses fra API kaldets json fil.<br>
På samme vis skifter svg filen efter hvad vejrsituationen er.<br>

Normalt ville jeg i et react projekt som dette bruge 'redux' til at udvide funktionaliteten, indtil videre er det dog kun de få konstanter som er sat i toppen af App.js

Projektet lukkes med
### `npm eject`

