## 1.Om du har ​N ​ anslutna klienter, hur många instanser av klassen Thread ​ behövs i:
### a. Server?
### b. Klient?
1a: N
1b: 1

## 2.Vad är runnable ​ i Java?

Ett interface som modulerar en körmetod vilket klassen Thread använder när den körs.


## 3:Vad är nyckelordet synchronized ​ i java?

Ett nyckelord som låser metoder och uttryck. Detta gör så att flera trådar inte kan använda samma objekt i programmet samtidigt. Om en tråd använder delen av koden så blockeras alla andra trådar tills den tråden är klar med objektet.


## 4.Beskriv de fyra skikten i TCP / IP-protokollstacken. 

#### Application Layer:
Innehåller protokoll avsedda för applikationer och tjänster, exempel på sådana är HTTP, SMTP, FTP, etc. Kommunikationsenheterna kallas messages på applikationslagret.

#### Transport Layer:
Levererar hela meddelanden kallade segment som kan bestå av ett eller flera datagram.Innehåller protokoll för hur själva överföringen av data skall göras. Exempel på sådana protokoll är TCP eller UDP. Där TCP är ett mera pålitligt protokoll (garanterar intakt data), medan UDP betraktas som snabbare (med eventuell dataförlust).

#### Internet (Network) Layer:
Ansvarig för leveransen av ett paket över multipla nätverk. Paketen kallas datagram, kan färdas olika vägar och komma ur ordning.
Själva IP-protokollet.

#### Network Access (Data Link) Layer:
Delar upp strömmen av bits till paket kallade frames. Lägger till en header på framen som identifierar sändare och mottagare inom nätverket, om mottagaren är utom nätverket sätts mottagern till enheten som kopplar nätverket till internetet.


## 5.Vad betyder flaggorna, ACK, SYN och SEQ och vilket protokoll hör de till? 

ACK (Acknowledge):
Indikerar att man har tagit emot data.
 
SYN (Synchronize): 
Initierar en koppling.

SEQ (Sequence):
Sekvensnummer, indikerar den första byten av varje segment av data som skickas.


## 6: Vad är skillnaden mellan TCP och UDP?

Se transport layer. 