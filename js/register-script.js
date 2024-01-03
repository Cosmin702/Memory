async function registra() {
    let data = await fetchDati();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    let utente = {
        username: username,
        password: CryptoJS.AES.encrypt(password, password).toString(),
    };

    for (let i = 0; i < data.utenti.length; i++) 
    {
        if (data.utenti[i].username == username) 
        {
            alert("Username già utilizzato!");
            return;
        }
    }

    data.utenti.push(utente);
    
    let newData = JSON.stringify(data);

    const response = await fetch(
        "http://cosmincloud.iliadboxos.it:25984/memory_game/1",
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: newData,
        }
    );

    if (response.ok) {
        alert("Registrazione effettuata con successo!");
    } 
    else 
    {
        alert("Registrazione non effettuata!");
        console.error("Errore: ${response.status}");
    }
}

async function fetchDati() {
    const response = await fetch(
        "http://cosmincloud.iliadboxos.it:25984/memory_game/1"
    );

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        console.error("Errore: ${response.status}");
    }
}

async function login() {
    let data = await fetchDati();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let utente = {
        username: username,
        password: CryptoJS.AES.encrypt(password, password).toString(),
    };
    
    for (let i = 0; i < data.utenti.length; i++) {
        if (data.utenti[i].username == utente.username && CryptoJS.AES.decrypt(data.utenti[i].password, password).toString(CryptoJS.enc.Utf8) == password) 
        {
            alert("Login effettuato con successo!");
            window.location.href = "index.html";
            return;
        }
    }

    alert("Username o password errati!");
}

