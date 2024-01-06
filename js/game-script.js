var carta2 = undefined;
var sequenza;
var on = false; // Variabile che indica se le carte sono in fase di controllo
var punti = 0;
var tentativi = 0;
var difficoltá;

// Funzione per girare la carta
function myFunction(carta) {
    // Se le carte sono in fase di controllo o la carta è già girata, esco dalla funzione
    if(on == true || carta.style.transform == "rotateY(180deg)")
    {
        return;
    }

    // Altrimenti, giro la carta di 180 gradi e controllo se è uguale alla carta precedente
    carta.style.transform = "rotateY(180deg)";
    controlloCarte(carta);
}

// Funzione che genera la sequenza di carte 
function generaSequenza() 
{
    // Ottengo il numero di carte presenti nel documento
    const ncarte = document.querySelectorAll(".carta").length;
    // Creo un array vuoto della stessa lunghezza
    let sequenza = Array(ncarte);
    // Genero un indice casuale tra 0 e ncarte - 1
    let indice = Math.floor(Math.random() * ncarte);

    // Per ogni coppia di carte (da 0 a ncarte/2 - 1)
    for (let i = 0; i < (ncarte/2); i++) 
    {
        // Finché l'elemento dell'array alla posizione indice non è undefined
        while(sequenza[indice] != undefined)
        {
            // Genero un nuovo indice casuale
            indice = Math.floor(Math.random() * ncarte); 
        }
        // Assegno all'elemento dell'array alla posizione indice il valore i
        sequenza[indice] = i;

        // Ripeto lo stesso procedimento per la seconda carta della coppia
        while(sequenza[indice] != undefined)
        {
            indice = Math.floor(Math.random() * ncarte); 
        }
        sequenza[indice] = i;
    }

    return sequenza;
}

// Funzione che assegna le immagini alle carte
function assegnaImmagine()
{
    sequenza = generaSequenza();
    // Ottengo tutti gli elementi con classe carta-fronte e tag img
    let immagini = document.querySelectorAll(".carta-fronte > img");    
    // Per ogni elemento dell'array sequenza
    for (let i = 0; i < sequenza.length; i++) 
    {
        // Assegno all'attributo src dell'immagine corrispondente il percorso della cartella img concatenato con il valore dell'elemento dell'array e l'estensione .png
        immagini[i].src = "img/" + sequenza[i] + ".png";
    }
}

// Funzione che controlla se le carte sono uguali
function controlloCarte(carta1)
{
    // Se é la prima carta che viene girata
    if(carta2 == undefined)
    {
        // Assegno alla variabile carta2 il valore di carta1
        carta2 = carta1;

    }
    // Se le due carte selezionate sono uguali
    else if(sequenza[carta1.id] == sequenza[carta2.id])
    {
        // Assegno alla variabile carta2 il valore undefined e incremento le variabili punti e tentativi di 1
        carta2 = undefined;
        punti++;
        tentativi++;
        // Imposto una funzione da eseguire dopo 800 millisecondi
        setTimeout(function() {
            // Se tutte le carte sono state girate
            if(punti == sequenza.length/2)
            {
                // Faccio partire una funzione che genera dei coriandoli e calcolo il punteggio finale
                confetti({
                    particleCount: 150,
                    spread: 180

                  });                
                  calcoloPunteggio();
            }
        }, 800); 
    }
    // Altrimenti
    else
    {
        // Imposto la variabile on a true e imposto una funzione da eseguire dopo 800 millisecondi
        on = true;
        setTimeout(function() {
            // Riporto le carte alla posizione iniziale e assegno alla variabile carta2 il valore undefined
            carta1.style.transform = "rotateY(0deg)";
            carta2.style.transform = "rotateY(0deg)";
            carta2 = undefined;   
            // Imposto la variabile on a false
            on = false;
        }, 800); 
        // Incremento la variabile tentativi di 1
        tentativi++;
    }
}

// Funzione che calcola il punteggio finale
function calcoloPunteggio()
{
    var totale = 100 - ((tentativi - punti) * 20/punti);
    // Modifico il contenuto dell'elemento con id punteggio con il valore calcolato e carico il punteggio nel localStorage e nel database
    document.getElementById("punteggio").innerHTML = "Punteggio: " + totale;
    caricaPunteggio(totale);
}

// Funzione asincrona che ottiene il punteggio massimo salvato nel localStorage
async function maxPunteggio(pagina) 
{
    difficoltá = pagina;
    // Ottengo il valore del punteggio dal localStorage e lo converto in un oggetto JSON
    let punteggio = JSON.parse(localStorage.getItem("punteggio"));
    
    if (punteggio == null || punteggio.id == -1)
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
        // Mostro un messaggio di avviso che i punteggi verranno salvati solo se l'utente si registra
        alert("I tuoi punteggi verranno salvati solo se ti registri!");
    }
    // Modifico il contenuto degli elementi con id username e max-punteggio con i valori dell'oggetto punteggio
    document.getElementById("username").innerHTML = punteggio.username;
    document.getElementById("max-punteggio").innerHTML = "Max punteggio: " + punteggio[difficoltá];
}

// Funzione asincrona che carica il punteggio nel localStorage e nel database
async function caricaPunteggio(totale)
{
    // Ottengo il valore del punteggio dal localStorage e lo converto in un oggetto JSON
    let punteggio = JSON.parse(localStorage.getItem("punteggio"));

    if(totale > punteggio[difficoltá])
    {
        // Assegno al valore del punteggio il valore totale e lo salvo nel localStorage
        punteggio[difficoltá] = totale;
        localStorage.setItem("punteggio", JSON.stringify(punteggio));
        
        if(punteggio.id != -1){
            // Faccio una richiesta asincrona al database per ottenere i dati
            let dati = await fetchDati(url2);
            // Aggiorno il punteggio dell'utente nel database con il valore del punteggio locale
            dati.punteggio[punteggio.id] = punteggio;
            // Invio i dati aggiornati al database
            pushDati(url2, dati);    
        }
        
        maxPunteggio();
    }
}
