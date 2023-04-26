const tableBody = document.getElementById("tableBody")
const inputId = document.getElementById("inputId")
const inputName = document.getElementById("inputName")
const inputDescription = document.getElementById("inputDescription")
const contenedorId = document.getElementById("contenedorId")
const btnModalFooter = document.getElementsByClassName("btn-modal-footer")



function obtener(){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    
    fetch("http://localhost/api/Gama/all", requestOptions)
    .then(response => response.json())
    .then(result => {
        result.forEach(element => {
            tableBody.innerHTML += `
                <tr>
                    <td>${element.name}</td>
                    <td>${element.description}</td>
                    <td>
                        <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#modal" onclick="btnDetails(${element.idGama})">
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
    
    fetch(`http://localhost/api/Gama/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
        inputId.value = result.idGama
        inputName.value = result.name
        inputDescription.value = result.description
    })
    .catch(error => console.log('error', error));
}

function eliminar(){
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
    };
    
    fetch(`http://localhost/api/Gama/${inputId.value}`, requestOptions)
    .then(response => window.location.reload())
    .catch(error => console.log('error', error));
}

function actualizar(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "idGama": inputId.value,
    "name": inputName.value,
    "description": inputDescription.value
    });

    var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://localhost/api/Gama/update", requestOptions)
    .then(response => {
        window.location.reload()
    })
    .catch(error => console.log('error', error));
}

function crear(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "name": inputName.value,
    "description": inputDescription.value
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://localhost/api/Gama/save", requestOptions)
    .then(response => {
        window.location.reload()
    })
    .catch(error => console.log('error', error));
}

function limpiarInput(){
    inputId.value = null
    inputName.value = null
    inputDescription.value = null
}

function btnAdd(){
    btnModalFooter[0].style.display = "block"
    btnModalFooter[1].style.display = "none"
    btnModalFooter[2].style.display = "none"
    contenedorId.style.display = "none"
    limpiarInput()
}

function btnDetails(id){
    btnModalFooter[0].style.display = "none"
    btnModalFooter[1].style.display = "block"
    btnModalFooter[2].style.display = "block"
    contenedorId.style.display = "block"
    obtenerPorId(id)
}

obtener()