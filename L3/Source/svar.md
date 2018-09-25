## Vad är skillnaden mellan == och ===? 
=== fungerar som == men utan typkonvertering, så typen måste överrensstämma

== är loose comparison

=== är strikt comparison

1 == "1" är true

1 === "1" är false

## Vad är “best practice” gällande vilken man ska använda?
===, ju noggrannare desto bättre i princip


## Vad gör “use strict”?
Indikerar att koden ska köras i strict mode, man kan till exempel inte använda odeklarerade variabler.

Det ger bättre kvalitet på koden, då det är lättare hänt att errors slinker igenom annars.

## Har javascript klasser? Är prototypes klasser? ​Motivera ditt svar​.
js har inte klasser, men det är möjligt att simulera scope som klasser har med s.k. closures.

Alla js-objekt ärver properties och metoder från en prototyp. Det är inte en klass, då klasser inte finns, men fungerar som arv i en klass. Prototype är i toppen av kedjan.

## Vad är callbacks i Javascript?
Det är en funktion som är ämnad till att anropas senare och passeras in i en funktion som en variabel. Callback-funktionen exekveras efter den nugående effekten är klar.

## Hur används callbacks asynkront?
Då callbacken inte kallas förrän senare så kan man säga att det är asynkront, värt att nämna är att js inte är asynkront, det är synkront, så callback simulerar asynkronhet men är faktiskt inte det.
