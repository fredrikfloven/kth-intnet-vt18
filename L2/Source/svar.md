# Frågor och svar

1. Vad är skillnaden mellan GET och POST:

  Den stora skillnaden mellan GET och POST är att POST innehåller en s.k. request body. Denna använder klienten för att skicka något till servern. 

  Därmed används GET mest för att hämta webbsidor, medan POST för att skicka tillbaka något till webbservern.

  För att då använda parametrar brukar dessa ligga i URLen i s.k. query parameters för GET. Medan man i POST kan lägga dem i request body.

2. Vad är REST?

  Representational State Transfer är ett begrepp som definerar hur kommunikationen mellan exempelvis applikationer, botar, etc. pratar med en webbserver för att nå resurser (exempelvis databas). Man kan säga att det är en standard för hur man ska bygga URLerna för sin webbserver (sitt REST API).

  REST säger att att varje resurs är unikt identifierbar. Exempelvis:

  [WEBBSERVER_URL]/users/fredrik
  [WEBBSERVER_URL]/users/simon

  Medan hela resursen (alla användare) kan fås genom:

  [WEBBSERVER_URL]/users

  De HTTP metoder som används är GET, POST, PUT, DELETE.

3. Vad är de andra HTTP metoderna som används i REST?
Se ovan. PUT och DELETE.

GET: Hämta resurs.
Exempel URL: [WEBBSERVER_URL]/users/fredrik

POST: Skapa ny resurs.
Exempel URL: [WEBBSERVER_URL]/users
Exempel data (request body): name=fredrik&password=123

PUT: Uppdatera existerande resurs.
Exempel URL: [WEBBSERVER_URL]/users/fredrik
Exempel data (request body): password=456

DELETE: Ta bort resurs.
Exempel URL: [WEBBSERVER_URL]/users/fredrik
  
