# QUESTIONS
## Vad är PKI?

Public Key Infrastructure eller PKI, är ett system för att utfärda, förvara och distribuera digitala certifikat.

Ett certifikat är likt ett virtuellt ID-kort, det är ett signerat meddelande som används för att kontrollera om en public key tillhör en viss enhet.

## Förklara hur PKI fungerar.
En request för Digital Certificate (DC) skickas till lämplig Certificate Authority (CA).

Efter att den specifika requesten har blivit processad, utfärdas DC till den entitet som bad om den.

DC blir signerad genom att bekräftning med riktig identitet av personen som frågar om DC.

DC kan nu användas för att kryptera plaintext till ciphertext.

Ett exempel på hur PKI används:
1. Fredrik vill prata säkert med Simon. 
2. Fredrik skapar en privat och publik nyckel. 
3. Fredrik ger Simon sin publika nyckel, och behåller den privata.
4. Simon använder den publika nyckeln för att kryptera sitt meddelande. Den publika nyckeln kan inte dekryptera meddelandet - det kan bara den privata.
5. Fredrik använder sin privata nyckel för att dekryptera meddelandet.

Simon litar på Fredrik eftersom han presenterat ett digital certifikat som bekräftar hans publika nyckel och identitet. Vi litar på utföraren (CA) och därmed på certifikatet, och därför på Fredrik.

## Vad löser PKI för problem?
### De tre säkerhetsproblemen är:
Autentisering - vem man kommunicerar med

Interception - avläsning av data

Dataintegritet - ändring av data

### PKI löser problem genom:
Certifikat

Kryptering

Hash

## Vad innehåller ett certifikat? Förklara alla fält.
X.509-cert innehåller följande fält(attribut):

Versionsnummer - innehåller versionen av certifikatet, ofta 3, nollindexerat -> så 2

Serie-nummer - positivt heltal tilldelat av CA till varje SLL cert. Unikt för varje cert givet av CA

Signaturalgoritm - identifierar den kryptiska algoritm använd av CA för att signera certifikatet. Ex. Sha-2

Utfärdarens namn - Identifierar entiteten som har signerat och utfärdat certifikatet. 

Validitetsperiod - Från när certifikatet är valid till när det slutar vara det

Subjektnamn - Innehåller Distinkt Namn(DN)-info för certifikatet, använder Common Name, Organization, Organizational Unit, City, State, Country Name

Subjekts publika nyckel-info - Identifierar algoritmen som är använd för certifikatet och byte-strängen för certifikatet

Extensioner (valfritt)

Signatur, krypterad med CAs (Certificate Authority, utfärdar certifikat) privata nyckel

## Hur valideras ett certifikat? 
Ett certifikat valideras i två steg:
Steg 1 - Verifiering av att applikanten äger eller har laglig rätt att använda domännamnet i applikationen.
Steg 2 - Verifiering av att applikanten är en legitim och en lagligt ansvarig entitet.

Rent tekniskt så kan validera ett certifikat med sin signatur. Vi avkrypterar signaturen med hjälp utav utfärdarens (CA exempelvis) publika nyckel. Då finner vi en hash, den hashen kan vi jämföra så att den överensstämmer med resten av det som finns i certifikatet. Certifikatet specificerar hur hashen skapats.

## Vilka algoritmer används på vilka fält och i vilken ordning?
RSA(2048) används ofta på den publika nyckeln.
keyIdentifier är ofta SHA-1 på subjectPublicKeyInfo, som är en extension
Signaturvärdet är hashat (t.ex. SHA) och krypterad (t.ex. RSA).

Se ovan för förklaring svar också kring vilka fält. Ett sätt vi kan validera är.
1. Dekryptera signatur.
2. Hasha alla fält i certifikat (utom signatur och signaturalgoritm) med signaturalgoritm.
3. Jämför hash som ficks samt hash i signatur. 

## Hur levereras root-certifikaten till din dator?
De distribueras i operativsystemet av tillverkaren, också genom uppdateringar. De kan också distribueras av IT-administratörer genom policy.

## Vad är en trust chain?
En trust chain/chain of trust/certificate chain är en ordnad lista av certifikatsom innehåller ett SSL-certifikat och CA-cert, som låter mottagaren verifiera att sändaren och alla CA är trovärdiga. Kedjan börjar med SSL-certifikatet, och varje cert i kedjan är signerad av den entitet identifierad av nästa certifikat i ledet.

Certifikaten mellan SSL-certifikatet och Root-certifikatet(RC) kallas kedja eller Intermediate Certificate (IC). RC är signeraren/utfärdaren av IC. Om IC inte är installerad på servern där SSL-certet är installerat kan vissa applikationer möjligen inte lita på SSL-certet.

Kedjan terminerar vid Root CA certet, som är signerat av CA själv. Signaturerna hos alla cert i kedjan måste bli verifierade upp till Root CA certet.
## Är det säkert att lagra lösenorden till certifikaten till din dator? Varför/Varför inte?
Nej, inte på datorn. Det är lätt att få tillgång till eller förlora. De bör sparas på ett s.k. smart card eller en extern hårddisk.

## Förklara HELA handshaket.

1. SSL- eller TLS-klienten skickar ett "client hello"-meddelande som listar kryptografisk information så som SSL/TLS-version och i ordning vald av klienten; en lista av CipherSuites som stöds av klienten. meddelandet innehåller även en slumpmässigt genererad byte-sträng  som används i framtida beräkningar. Protokollet låter "client hello"-meddelandet att inkludera datakompressionsmetoder som stöds av klienten.

2. SSL-/TLS-servern svara med ett "server hello"-meddelande som innehåller den CipherSuite som servern valt utifrån listan skickad av klienten, sessions-id:t, och en annan slumpmässigt genererad byte-sträng. Servern skickar också sitt digitala certifikat. Om servern kräver ett digitalt certifikat för klient-autentisering så skickar servern också en "client certificate request" som inkluderar en lista av typer av certifikat som stöds och de distinkta namnern på acceptabla Certification Authorities (CAs).

Servern skickar sitt "hello done".

3. SSL-/TLS-klienten verifierar serverns digitala certifikat. 

4. Klienten skickar byte-strängen som gör så att både klienten och servern kan generera den hemliga nyckeln som ska användas för att kryptera uppföljande data. Byte-strängen är krypterad med servern's publika nyckel.

5. Om servern skickade en "client certificate request" så skickar klienten en slumpgenererad byte-sträng krypterad med klientens privata nyckel, tillsammans med klientens digitala certifikat, eller en "no digital certificate alert", som endast är en varning, dock kan handskakningen misslyckas i vissa implementationer ifall klientautentisering är obligatorisk.

6. Servern verifierar klientens certifikat.

7. Klient skickar "Change Cipher Spec" som indikerar att man nu byter till symmetrisk kryptering. Klienten skickar servern ett "finished"-meddelande, som är krypterat med den hemliga nyckeln, och indikerar att klientens del av handskakningen är klar.

8. Server skickar "Change Cipher Spec" som indikerar att man nu byter till symmetrisk kryptering. Servern skickar klienten ett "finished"-meddelande, som är krypterat med den hemliga nyckeln, och indikerar att serverns del av handskakningen är klar.

9. För återstående SSL-/TLS-session så kan servern och klienten utbyta meddelanden som är symmetriskt krypterade med den delade hemliga nyckeln.



## När i handshaket används symmetriskt kryptering?
Symmetrisk kryptering använder en "secret key"/"hemlig nyckel" för både kryptering och dekryptering.

Se föregående fråga om när det används

## När används asymmetriskt kryptering?
Kallas också Public Key Cryptography

Asymmetrisk kryptering använder två separata nycklar, en publik nyckel för kryptering och en privat nyckel för dekryptering

Se föregående fråga om när det används

# Keywords:

## X.509 
Standard för att specifiera ett certifikats format
## (TLS) Transport Layer Security 
Kryptografiskt protokoll som ger kommunikationssäkerhet över ett nätverk. Anslutningen mellan en klient och en server som använder TLS har egenskaperna: 
- Den är säker, då symmetrisk kryptering används på datan som skickas, nycklarna är unikt genererade för vaje anslutning och är baserade på en delad secret förhandlad i början av sessionen innan data skickas. Förhandlingen är säker och pålitlig.

- Identiteten hos båda parter kan autentiseras genom publi nyckel-kryptografi, kan göras valfri, men krävs oftast av en av parterna, servern oftast.

- Anslutningen garanterar integritet då varje meddelande inkluderar en meddelandeintegritetskoll genom en MAC för att se till at tingen data förlortas eller ändras

## (SSL) Secure Socket Layer
Äldre än TLS.

Standard säkerhetsteknologi för att skapa en krypterad länk mellan en webbserver och en webbläsare. Länken försäkrar att all data skickad mellan servern och läsaren behålls privat och integral. Kräver en SSL-cert för att få en SSL-länk. 
## Symmetrisk kryptering
### (AES) Advanced Encryption Standard
Symmetrisk kryptering, en gemensam nyckel, snabbt
## Asymmetrisk kryptering
### (RSA) Rivest Shamir Adleman
Asymmetrisk kryptering, två nycklar, publik/privat, löser autentisering, beräkningsintensiv(sämre för kryptering av stora datamängder)

### Public key
Används för att kryptera plaintext till en ciphertext, används för att kryptera text till en specifik individ som har den privata nyckeln.
### Private key 
Används för att dekryptera en ciphertext till plaintext som blivit krypterad med ens publika nyckel.

## Cipher Suite 
En mängd algoritmer som säkrar en nätverksanslutning som använder TLS eller SSL. Innehåller ofta en nyckeldelningsalgoritm, en bulkkrypteringsalgoritm och en Message Authentication Code(MAC)-algoritm.

Nyckeldelningsalgoritmen används för att dela nycklar mellan apparater, krypterar och dekrypterar meddelanden mellan två maskiner.

Bulkdelningsalgoritmen används för att kryptera skickade datan.

MAC kollar dataintegritet för att se till att data inte har ändrats på vägen.

Cipher Suites kan också innehålla signaturer och en autentisering för att autentisera klienten eller servern.

## (HTTPS) Secure HTTP
En adaptering av HTTP för säker kommunikation över ett nätverk. Krypterar kommunikationsprotokollet med TLS eller den äldre SSL.

## Hash Algorithms
Mappar data till en sträng, kallad en hash
### (MD5) Message Digest 5
128-bitar. Osäker, men används som checksum för att verifiera dataintegritet, dock endast för oavsiktlig korruption. Kan bli brute-forcad. Är inte kryptering.

### (SHA) Secure Hash Algorithm
SHA-1 liknar MD5, men är 160 bitar, används ej. SHA-2 används och är samlingsnamn för SHA-256 och SHA-512 bland annat.
Används i TLS, SSL, IPsec, SSH, Bitcoin m.fl.