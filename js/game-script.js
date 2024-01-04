var carta2 = undefined;
var sequenza;
var on = false;
var punti = 0;
var tentativi = 0;
// Function per girare la carta
function myFunction(carta) {
    if(on == true || carta.style.transform == "rotateY(180deg)")
    {
        return;
    }

    carta.style.transform = "rotateY(180deg)";
    controlloCarte(carta);
}

// Function che genera la sequenza di carte 
function generaSequenza() 
{
    const ncarte = document.querySelectorAll(".carta").length;
    let sequenza = Array(ncarte);
    let indice = Math.floor(Math.random() * ncarte);

    for (let i = 0; i < (ncarte/2); i++) 
    {
        while(sequenza[indice] != undefined)
        {
            indice = Math.floor(Math.random() * ncarte); 
        }
        sequenza[indice] = i;

        while(sequenza[indice] != undefined)
        {
            indice = Math.floor(Math.random() * ncarte); 
        }
        sequenza[indice] = i;
    }

    return sequenza;
}

// Function che assengna le immagini alle carte
function assegnaImmagine()
{
    sequenza = generaSequenza();
    let immagini = document.querySelectorAll(".carta-fronte > img");
    
    for (let i = 0; i < sequenza.length; i++) 
    {
        immagini[i].src = "img/" + sequenza[i] + ".png";
    }
}

// Function che controlla se le carte sono uguali

function controlloCarte(carta1)
{
    if(carta2 == undefined)
    {
        carta2 = carta1;

    }
    else if(sequenza[carta1.id] == sequenza[carta2.id])
    {
        carta2 = undefined;
        punti++;
        tentativi++;
        setTimeout(function() {
            if(punti == sequenza.length/2)
            {
                calcoloPunteggio();
                alert("Hai vinto!");
            }
    }, 800); 
    }
    else
    {
        on = true;
        setTimeout(function() {
            carta1.style.transform = "rotateY(0deg)";
            carta2.style.transform = "rotateY(0deg)";
            carta2 = undefined;   
            on = false;
        }, 800); 
        tentativi++;
    }
}

function calcoloPunteggio()
{
    var totale = 1000 - ((tentativi - punti) * 10);
    document.getElementById("punteggio").innerHTML = "Punteggio: " + totale;
    caricaPunteggio(totale);
}

async function maxPunteggio() 
{
    let punteggio = JSON.parse(localStorage.getItem("punteggio"));
    document.getElementById("username").innerHTML = punteggio.username;
    document.getElementById("max-punteggio").innerHTML = "Max punteggio: " + punteggio.facile;
}

async function caricaPunteggio(totale)
{
    let punteggio = JSON.parse(localStorage.getItem("punteggio"));

    if(totale > punteggio.facile)
    {
        punteggio.facile = totale;
        localStorage.setItem("punteggio", JSON.stringify(punteggio));
        let dati = await fetchDati(url2);
        dati.punteggio[punteggio.id] = punteggio;
        const response = await fetch(
            url2, 
                {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dati),
            });
        
        if (response.ok) 
        {
            console.log("Registrazione effettuata con successo!");
        } 
        else 
        {
            console.error("Errore: ${response.status}");
        }
    }
}