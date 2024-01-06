// Dichiaro due costanti che contengono gli url del database
const url1 = "http://cosmincloud.iliadboxos.it:25984/memory_game/1";
const url2 = "http://cosmincloud.iliadboxos.it:25984/memory_game/2";

// Funzione asincrona che registra un nuovo utente nel database
async function registra() {
    // Faccio due richieste asincrone al database per ottenere i dati degli utenti e dei punteggi
    let dati = await fetchDati(url1);
    let punti = await fetchDati(url2);

    // Ottengo i valori degli elementi con id username e password dal documento
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Creo un oggetto utente con le proprietà username e password criptata
    let utente = {
        username: username,
        password: CryptoJS.AES.encrypt(password, password).toString(),
    };

    // Per ogni elemento dell'array utenti contenuto nei dati
    for (let i = 0; i < dati.utenti.length; i++) 
    {
        
        // Se l'username dell'elemento corrisponde all'username inserito
        if (dati.utenti[i].username == username) 
        {
            // Mostro un messaggio di avviso che l'username è già utilizzato e esco dalla funzione
            alert("Username già utilizzato!");
            return;
        }
    }

    // Aggiungo l'oggetto utente all'array utenti
    dati.utenti.push(utente);
    
    // Invio i dati aggiornati al database con l'url1
    pushDati(url1, dati);
    
    // Creo un oggetto punteggio con le proprietà id, username e i valori dei punteggi per ogni livello
    let punteggio = {
        id: dati.utenti.length - 1,
        username: username,
        facile: 0,
        medio: 0,
        difficile: 0,
    };

    // Aggiungo l'oggetto punteggio all'array punteggio
    punti.punteggio.push(punteggio);

    // Invio i dati aggiornati al database con l'url2
    let risposta = await pushDati(url2, punti);

    if(risposta.ok)
    {
        // Mostro un messaggio di conferma che la registrazione è avvenuta con successo
        alert("Registrazione effettuata con successo!");
    }
}


// Funzione asincrona che effettua il login di un utente esistente nel database
async function login() {
    // Faccio una richiesta asincrona al database per ottenere i dati degli utenti
    let dati = await fetchDati(url1);

    // Ottengo i valori degli elementi con id username e password dal documento
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    
    // Per ogni elemento dell'array utenti contenuto nei dati
    for (let i = 0; i < dati.utenti.length; i++) {
        
        // Se l'username e la password dell'elemento corrispondono a quelli inseriti
        if (dati.utenti[i].username == username 
            && CryptoJS.AES.decrypt(dati.utenti[i].password, password).toString(CryptoJS.enc.Utf8) == password) 
        {
            // Mostro un messaggio di conferma che il login è avvenuto con successo
            alert("Login effettuato con successo!");
            // Invoco la funzione caricaUtente passando l'id dell'elemento come parametro
            caricaUtente(i);
            return;
        }
    }

    // Se non ho trovato nessun elemento corrispondente, mostro un messaggio di errore che l'username o la password sono errati
    alert("Username o password errati!");
}

// Funzione asincrona che carica il punteggio dell'utente nel localStorage
async function caricaUtente(id) {
    // Faccio una richiesta asincrona al database per ottenere i dati dei punteggi
    const dati = await fetchDati(url2);
    
    // Per ogni elemento dell'array punteggio contenuto nei dati
    for(let i = 0; i < dati.punteggio.length; i++)
    {
        // Se l'id dell'elemento corrisponde all'id passato come parametro
        if(dati.punteggio[i].id == id)
        {
            // Salvo l'elemento nel localStorage convertendolo in una stringa JSON
            localStorage.setItem("punteggio", JSON.stringify(dati.punteggio[i]));
            // Reindirizzo la pagina verso index.html
            window.location.href = "index.html";
            return;
        }
    }
}

// Funzione che effettua il logout dell'utente
function logout() {
    // Se l'id del punteggio salvato nel localStorage è uguale a -1
    if(JSON.parse(localStorage.getItem("punteggio")).id == -1)
    {
        // Mostro un messaggio di avviso che non ho eseguito l'accesso e esco dalla funzione
        alert("Non hai eseguito l'accesso!");
        return;
    }
    // Creo un oggetto punteggio con id -1, username Guest e tutti i valori a 0
    punteggio = {
        id: -1,
        username: "Guest",
        facile: 0,
        medio: 0,
        difficile: 0,
    };
    // Salvo l'oggetto punteggio nel localStorage convertendolo in una stringa JSON
    localStorage.setItem("punteggio", JSON.stringify(punteggio));    
    // Modifico il contenuto dell'elemento con id username con il valore dell'username del punteggio
    document.getElementById("username").innerHTML = "Bentornato: " + punteggio.username;
    // Mostro un messaggio di conferma che sono uscito dal mio account
    alert("Sei uscito dal tuo account!");

}
