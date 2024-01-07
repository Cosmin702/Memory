// Funzione asincrona che ottiene i punteggi degli utenti dal database e li mostra in una tabella
async function punteggi() {
    // Faccio una richiesta asincrona al database per ottenere i dati
    let data = await fetchDati(url2);

    // Ordino l'array punteggio in base alla media dei 3 punteggi
    data.punteggio.sort((a, b) => {
        const mediaA = (a.facile + a.medio + a.difficile) / 3;
        const mediaB = (b.facile + b.medio + b.difficile) / 3;
        return mediaB - mediaA;
    });

    // Ottengo l'elemento con id table dal documento
    let table = document.getElementById("table");

    // Rimuovo tutte le righe esistenti dalla tabella
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    // Per ogni elemento dell'array punteggio contenuto nei dati
    for (let i = 0; i < data.punteggio.length; i++) {
        // Inserisco una nuova riga nella tabella alla posizione i+1
        let row = table.insertRow(i + 1);
        // Inserisco quattro celle nella riga
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);

        // Assegno il contenuto delle celle con i valori dell'elemento corrispondente dell'array punteggio
        cell1.innerHTML = data.punteggio[i].username;
        cell2.innerHTML = data.punteggio[i].facile;
        cell3.innerHTML = data.punteggio[i].medio;
        cell4.innerHTML = data.punteggio[i].difficile;

        // Aggiungo la riga alla tabella
        table.appendChild(row);
    }
}

// Funzione che ottiene il punteggio dell'utente dal localStorage e lo mostra nel documento
function utente(){
    // Ottengo il valore del punteggio dal localStorage e lo converto in un oggetto JSON
    let punteggio = JSON.parse(localStorage.getItem("punteggio"));
    
    // Se il punteggio è null
    if (punteggio == null)
    {
        // Creo un nuovo oggetto punteggio con id -1, username Guest e tutti i valori a 0 e lo salvo nel localStorage
        punteggio = {
            id: -1,
            username: "Guest",
            facile: 0,
            medio: 0,
            difficile: 0,
        };
        localStorage.setItem("punteggio", JSON.stringify(punteggio));
    }
    // Modifico il contenuto dell'elemento con id username con il valore dell'username del punteggio
    document.getElementById("username").innerHTML = "Bentornato: " + punteggio.username;
}

// Funzione asincrona che fa una richiesta al database per ottenere i dati
async function fetchDati(url) {
    // Faccio una richiesta asincrona all'url passato come parametro
    const response = await fetch(url);

    // Se la richiesta ha avuto successo
    if (response.ok) 
    {
        // Restituisco i dati convertiti in formato JSON
        return await response.json();
    } 
    else 
    {
        // Mostro un messaggio di errore con lo stato della richiesta
        console.error("Errore: ${response.status}");
    }

    return response;
}

// Funzione asincrona che invia i dati al database
async function pushDati(url, newDati) {

    // Faccio una richiesta asincrona all'url passato come parametro con il metodo PUT e i nuovi dati come corpo della richiesta
    response = await fetch(
        url,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newDati),
        }
    );

    // Se la richiesta ha avuto successo
    if (response.ok) 
    {
        // Mostro un messaggio di conferma
        console.log("Dati caricati con successo!");
    } 
    else 
    {
        // Mostro un messaggio di errore con lo stato della richiesta
        console.error("Errore: ${response.status}");
    }
    return response;
}
