function registerUser(){
    const username = prompt("Please enter your username")
    const password = prompt("Please enter your password")
    const params = `?name=${username}?password=${password}`
    fetch('http://localhost:3000/api/users/register'+params, {
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

function loginUser(){
    const username = prompt("Please enter your username")
    const password = prompt("Please enter your password")
    const params = `?name=${username}?password=${password}`
    fetch('http://localhost:3000/api/users/login'+params, {
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