const tableBody = document.getElementById("tableBody")
const inputId = document.getElementById("inputId")
const inputMessage = document.getElementById("inputMessage")
const selectClient = document.getElementById("selectClient")
const selectCar = document.getElementById("selectCar")
const inputDescription = document.getElementById("inputDescription")
const contenedorId = document.getElementById("contenedorId")
const btnModalFooter = document.getElementsByClassName("btn-modal-footer")


function obtener(){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    
    fetch("http://localhost/api/Message/all", requestOptions)
    .then(response => response.json())
    .then(result => {
        result.forEach(element => {
            tableBody.innerHTML += `
                <tr>
                    <td>${element.messageText}</td>
                    <td>${element.car.name}</td>
                    <td>${element.client.name}</td>
                    <td>
                        <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#modal" onclick="btnDetails(${element.idMessage})">
                            Details
                        </button>
                    </td>
                </tr>
            `
        });
    })
    .catch(error => console.log('error', error));
}

function obtenerPorId(id){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    
    fetch(`http://localhost/api/Message/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
        inputId.value = result.idMessage
        inputMessage.value = result.messageText
        selectCar.innerHTML = `<option>${result.car.name}</option>`
        selectClient.innerHTML = `<option>${result.client.name}</option>`
    })
    .catch(error => console.log('error', error));
}

function eliminar(){
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
    };
    
    fetch(`http://localhost/api/Message/${inputId.value}`, requestOptions)
    .then(response => window.location.reload())
    .catch(error => console.log('error', error));
}

function actualizar(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "idMessage": inputId.value,
    "messageText": inputMessage.value,
    });

    var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://localhost/api/Message/update", requestOptions)
    .then(response => {
        window.location.reload()
    })
    .catch(error => console.log('error', error));
}


function crear(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "messageText": inputMessage.value,
        "client": {
            "idClient":selectClient.value
        },
        "car":{
            "idCar":selectCar.value
        }
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://localhost/api/Message/save", requestOptions)
    .then(response => {
        window.location.reload()
    })
    .catch(error => console.log('error', error));
}

function obtenerCars(){
    selectCar.innerHTML = null
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    
    fetch("http://localhost/api/Car/all", requestOptions)
    .then(response => response.json())
    .then(result => {
        result.forEach(element => {
            selectCar.innerHTML += `<option value="${element.idCar}">${element.name}</option>`
        });
    })
    .catch(error => console.log('error', error));
}

function obtenerClients(){
    selectClient.innerHTML = null
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    
    fetch("http://localhost/api/Client/all", requestOptions)
    .then(response => response.json())
    .then(result => {
        result.forEach(element => {
            selectClient.innerHTML += `<option value="${element.idClient}">${element.name}</option>`
        });
    })
    .catch(error => console.log('error', error));
}

function limpiarInput(){
    inputId.value = null
    inputMessage.value = null
}

function btnAdd(){
    btnModalFooter[0].style.display = "block"
    btnModalFooter[1].style.display = "none"
    btnModalFooter[2].style.display = "none"
    contenedorId.style.display = "none"
    selectCar.disabled = false
    selectClient.disabled = false
    limpiarInput()
    obtenerCars()
    obtenerClients()
}

function btnDetails(id){
    btnModalFooter[0].style.display = "none"
    btnModalFooter[1].style.display = "block"
    btnModalFooter[2].style.display = "block"
    contenedorId.style.display = "block"
    selectCar.disabled = true
    selectClient.disabled = true
    obtenerPorId(id)
    
}

obtener()