const url1 = "http://cosmincloud.iliadboxos.it:25984/memory_game/1";
const url2 = "http://cosmincloud.iliadboxos.it:25984/memory_game/2";

async function registra() {
    let dati = await fetchDati(url1);
    let punti = await fetchDati(url2);

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    let utente = {
        username: username,
        password: CryptoJS.AES.encrypt(password, password).toString(),
    };

    for (let i = 0; i < dati.utenti.length; i++) 
    {
        
        if (dati.utenti[i].username == username) 
        {
            alert("Username già utilizzato!");
            return;
        }
    }

    dati.utenti.push(utente);
    
    pushDati(url1, dati);
    
    let punteggio = {
        id: dati.utenti.length - 1,
        username: username,
        facile: 0,
        medio: 0,
        difficile: 0,
    };

    punti.punteggio.push(punteggio);

    pushDati(url2, punti);

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


async function login() {
    let dati = await fetchDati(url1);

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    
    for (let i = 0; i < dati.utenti.length; i++) {
        
        if (dati.utenti[i].username == username 
            && CryptoJS.AES.decrypt(dati.utenti[i].password, password).toString(CryptoJS.enc.Utf8) == password) 
        {
            alert("Login effettuato con successo!");
            caricaUtente(i);
            return;
        }
    }

    alert("Username o password errati!");
}

async function caricaUtente(id) {
    const dati = await fetchDati(url2);
    
    for(let i = 0; i < dati.punteggio.length; i++)
    {
        if(dati.punteggio[i].id == id)
        {
            localStorage.setItem("punteggio", JSON.stringify(dati.punteggio[i]));
            window.location.href = "index.html";
            return;
        }
    }


}

