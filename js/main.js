async function punteggi() {
    let data = await fetchDati(url2);

    let table = document.getElementById("table");

    for (let i = 0; i < data.punteggio.length; i++) 
    {
        let row = table.insertRow(i+1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4= row.insertCell(3);

        cell1.innerHTML = data.punteggio[i].username;
        cell2.innerHTML = data.punteggio[i].facile;
        cell3.innerHTML = data.punteggio[i].medio;
        cell4.innerHTML = data.punteggio[i].difficile;

        table.appendChild(row)
    }
}

function utente(){
    let punteggio = JSON.parse(localStorage.getItem("punteggio"));
    
    if (punteggio == null)
    {
        punteggio = {
            id: -1,
            username: "Guest",
            facile: 0,
            medio: 0,
            difficile: 0,
        };
        localStorage.setItem("punteggio", JSON.stringify(punteggio));
    }
    document.getElementById("username").innerHTML = "Bentornato: " + punteggio.username;
}

async function fetchDati(url) {
    const response = await fetch(url);

    if (response.ok) 
    {
        return await response.json();
    } 
    else 
    {
        console.error("Errore: ${response.status}");
    }
}

async function pushDati(url, newDati) {

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

    if (response.ok) 
    {
        console.log("Dati caricati con successo!");
    } 
    else 
    {
        console.error("Errore: ${response.status}");
    }
    return response;
}