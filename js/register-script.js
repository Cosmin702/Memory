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

function logout() {
    if(JSON.parse(localStorage.getItem("punteggio")).id == -1)
    {
        alert("Non hai eseguito l'accesso!");
        return;
    }
    punteggio = {
        id: -1,
        username: "Guest",
        facile: 0,
        medio: 0,
        difficile: 0,
    };
    localStorage.setItem("punteggio", JSON.stringify(punteggio));    
    document.getElementById("username").innerHTML = "Bentornato: " + punteggio.username;
    alert("Sei uscito dal tuo account!");

}