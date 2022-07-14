

function showHealthCheck(){
    document.getElementById("message").innerHTML = "Voici le healthcheck. La request est valide mais ne permet pas de recuperer la reponse."
    fetch('http://localhost:3000/api/healthcheck', {
    // mode: 'no-cors',
    method: 'GET',
    headers: {
        Accept: 'application/json',
    },
    },
    ).then(response => {
    if (response.ok) {
        response.json().then(json => {
        alert(json.body);
        document.getElementById("b1").innerHTML = JSON.stringify(json)
        });
    }
    else{
        alert("PAS OK")
    }
    });
}