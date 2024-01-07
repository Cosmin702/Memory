# Memory-game

Dalle carte al computer, é arrivato il remake del classico gioco di memory che tutti conosciamo, rivisitato per offrire l'esperienza classica in un formato piú moderno!
Con l'aggiunta di funzionalità rivoluzionari, come il calcolo automatico del punteggio, il tempo di gioco e per la prima volta una classifica mondiale dei utenti.
Ogni utente quindi avrà la possibilità di creare un proprio account e le sue giocate migliori verranno automaticamente salvate sul server.

## Funzionalità

### Pagina principale
Nella prima pagina troviamo la sezione di registrazione o login, la scelta della difficoltà e la classifica dei utenti.
Ogni utente avrà la possibilità di creare un proprio account in cui saranno salvati i propri punteggi e ovviamente avrà la possibilità di accedere per giocare di nuovo.

La classifica viene creata prendendo dal server i dati dei punteggi, vengono riordianti in base alla media dei punteggi piú alti e poi vengono rimessi in una tabella.

### Database e server
Per ottenere quindi le funzionalitá di classifica e la gestione di utenti é stato necessario usare un database.
Per permette di gestire tutto lato client tramite Javascript ho utilizzato [CouchDB](https://couchdb.apache.org/), un database NoSQL che utilizza come struttura dati il JSON.
La pagina in pratica, esegue quando necesario, una richiesta CORS tramite la [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), richiedendo di inviare dati (metodo PUT) o ricevere dati (metodo GET) quando necessario.
Il tutto viene hostato su un mio server di casa, incluso il server della pagina, entrambi in un proprio container separato e porte di rete diverse.

La sicurezza ovviamente non é stata trascurata, infatti le password di login sono state criptate con la libreria [crypto-js](https://github.com/brix/crypto-js), che alla registrazione cripta la password con con lo standard AES utilizzando come chiave la password stessa.
Quindi essendo anche gestore del server, **non avro mai accesso alle password del utente**, e quindi anche eventuali malintenzionati, essendo che solo utente con la password giusta portra avere accesso al suo account.

[!CAUTION]
Tutto il sistema é lato client questo vuol dire che gli utenti potrebbe manipolare i dati inviati e ricevuti, ifatti il database é liberamente accessibilie da chiunque con l'url trovabile nel codice e anche se sarebbe possibile impostare un metodo di autentificazione, le chiavi di acesso sarebbero facilmente accessibili da chiunque nel codice.
Per avere effetivamente un sistema molto piú sicuro sarebbe necessario usare un sistema di acceso lato server, ma essendo che non siamo ancora arrivati a programmare in php, non avrei avuto tempo di idealizzare tutto.





 
