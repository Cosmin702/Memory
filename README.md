# Memory-game

Dalle carte al computer, è arrivato il remake del classico gioco di memory che tutti conosciamo, rivisitato per offrire l'esperienza classica in un formato più moderno!
Con l'aggiunta di funzionalità rivoluzionarie, come il calcolo automatico del punteggio, il tempo di gioco e per la prima volta una classifica mondiale dei utenti.
Ogni utente quindi avrà la possibilità di creare un proprio account e le sue giocate migliori verranno automaticamente salvate sul server.

## Funzionalità

### Pagina principale
Nella prima pagina troviamo la sezione di registrazione o login, la scelta della difficoltà e la classifica dei utenti.
Ogni utente avrà la possibilità di creare un proprio account in cui saranno salvati i propri punteggi e ovviamente avrà la possibilità di accedere per giocare di nuovo.

La classifica viene creata prendendo dal server i dati dei punteggi, vengono riordinati in base alla media dei punteggi più alti e poi vengono rimessi in una tabella.

### Database e server
Per ottenere quindi le funzionalità di classifica e la gestione di utenti è stato necessario usare un database.
Per permettere di gestire tutto lato client tramite Javascript ho utilizzato CouchDB, un database NoSQL che utilizza come struttura dati il JSON.
La pagina in pratica, esegue quando necessario, una richiesta CORS tramite la Fetch API, richiedendo di inviare dati (metodo PUT) o ricevere dati (metodo GET) quando necessario.
Il tutto viene hostato su un mio server di casa, incluso il server della pagina, entrambi in un proprio container separato e porte di rete diverse.

La sicurezza ovviamente non è stata trascurata, infatti le password di login sono state criptate con la libreria crypto-js, che alla registrazione cripta la password con lo standard AES utilizzando come chiave la password stessa.
Quindi essendo anche gestore del server, **non avrò mai accesso alle password del utente**, e quindi anche eventuali malintenzionati, essendo che solo l'utente con la password giusta potrà avere accesso al suo account.

>[!CAUTION]
>Tutto il sistema è lato client questo vuol dire che gli utenti potrebbero manipolare i dati inviati e ricevuti.
>Infatti il database è liberamente accessibile da chiunque con l'url trovabile nel codice e anche se sarebbe possibile impostare un metodo di autentificazione, le chiavi di accesso sarebbero facilmente accessibili da chiunque nel codice.
>Per avere effettivamente un sistema molto più sicuro sarebbe necessario usare un sistema di accesso lato server, ma essendo che non siamo ancora arrivati a programmare in php, non avrei avuto tempo di ideare tutto.

### Gioco
Come visto prima si può scegliere la difficoltà di gioco, questo cambierà il numero di carte e anche il calcolo del punteggio.
Ho scelto un set di carte tradizionale e inoltre quando si seleziona una carta, essa ruoterà con un'animazione come nel gioco originale.
Il codice all'avvio della pagina, crea tutte le coppie di carte e ne assegna le immagini corrispondenti, il tutto è automatico, utilizzando la funzione querySelector.

Alla vittoria si vedrà un'animazione di coriandoli utilizzando la libreria canvas-confetti, verrà automaticamente calcolato il punteggio e sarà salvato sul server se è il punteggio migliore.
Il punteggio è calcolato in base al numero di tentativi e anche al tempo che ci si è messi.
Per gli utenti che non hanno eseguito l'accesso, i dati saranno salvati solo lato client e non lato server.

>[!CAUTION]
>Il tutto è gestito lato server e quindi la manipolazione dei dati è molto semplice, essendo che gli utenti potrebbero tranquillamente ottenere la sequenza usata dalle carte.
