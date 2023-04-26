const tableBody = document.getElementById("tableBody")
const inputId = document.getElementById("inputId")
const inputName = document.getElementById("inputName")
const inputBrand = document.getElementById("inputBrand")
const inputYear = document.getElementById("inputYear")
const selectGama = document.getElementById("selectGama")
const inputDescription = document.getElementById("inputDescription")
const contenedorId = document.getElementById("contenedorId")
const btnModalFooter = document.getElementsByClassName("btn-modal-footer")


function obtener(){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    
    fetch("http://localhost/api/Car/all", requestOptions)
    .then(response => response.json())
    .then(result => {
        result.forEach(element => {
            tableBody.innerHTML += `
                <tr>
                    <td>${element.name}</td>
                    <td>${element.brand}</td>
                    <td>${element.year}</td>
                    <td>${element.description}</td>
                    <td>${element.gama.name}</td>
                    <td>
                        <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#modal" onclick="btnDetails(${element.idCar})">
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
    
    fetch(`http://localhost/api/Car/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
        inputId.value = result.idCar
        inputName.value = result.name
        inputBrand.value = result.brand
        inputYear.value = result.year
        inputDescription.value = result.description
        selectGama.innerHTML = `<option>${result.gama.name}</option>`
    })
    .catch(error => console.log('error', error));
}

function eliminar(){
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
    };
    
    fetch(`http://localhost/api/Car/${inputId.value}`, requestOptions)
    .then(response => window.location.reload())
    .catch(error => console.log('error', error));
}

function actualizar(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "idCar": inputId.value,
    "name": inputName.value,
    "brand": inputBrand.value,
    "year": inputYear.value,
    "description": inputDescription.value
    });

    var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://localhost/api/Car/update", requestOptions)
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
        "brand": inputBrand.value,
        "year": inputYear.value,
        "description": inputDescription.value,
        "gama":{
            "idGama":selectGama.value
        }
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://localhost/api/Car/save", requestOptions)
    .then(response => {
        window.location.reload()
    })
    .catch(error => console.log('error', error));
}

function obtenerGamas(){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    
    fetch("http://localhost/api/Gama/all", requestOptions)
    .then(response => response.json())
    .then(result => {
        result.forEach(element => {
            selectGama.innerHTML += `<option value="${element.idGama}">${element.name}</option>`
        });
    })
    .catch(error => console.log('error', error));
}

function limpiarInput(){
    inputId.value = null
    inputName.value = null
    inputBrand.value = null
    inputYear.value = null
    inputDescription.value = null
}

function btnAdd(){
    btnModalFooter[0].style.display = "block"
    btnModalFooter[1].style.display = "none"
    btnModalFooter[2].style.display = "none"
    contenedorId.style.display = "none"
    selectGama.disabled = false
    limpiarInput()
    obtenerGamas()
}

function btnDetails(id){
    btnModalFooter[0].style.display = "none"
    btnModalFooter[1].style.display = "block"
    btnModalFooter[2].style.display = "block"
    contenedorId.style.display = "block"
    selectGama.disabled = true
    obtenerPorId(id)
    
}

obtener()