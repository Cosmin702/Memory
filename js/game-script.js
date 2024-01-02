var carta2 = undefined;
var sequenza;
var on = false;
var punti = 0;
var tentativi = 0;
// Function per girare la carta
function myFunction(carta) {
    if(on == true)
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

    /*
    for(let i = 0; i < sequenza.length; i++)
    {
        n = Math.floor(Math.random() * ncarte);
        while(sequenza.find(element => element == n) == undefined)
        {
            sequenza[i] = n;
            n = Math.floor(Math.random() * ncarte);
        }
    }
    */
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

}