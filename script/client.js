const tableBody = document.getElementById("tableBody")
const inputId = document.getElementById("inputId")
const inputName = document.getElementById("inputName")
const inputEmail = document.getElementById("inputEmail")
const inputPassword = document.getElementById("inputPassword")
const inputAge = document.getElementById("inputAge")
const btnModalFooter = document.getElementsByClassName("btn-modal-footer")

function obtener(){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    
    fetch("http://localhost/api/Client/all", requestOptions)
    .then(response => response.json())
    .then(result => {
        result.forEach(element => {
            tableBody.innerHTML += `
                <tr>
                    <td>${element.name}</td>
                    <td>${element.email}</td>
                    <td>${element.age}</td>
                    <td>
                        <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#modal" onclick="btnDetails(${element.idClient})">
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
    
    fetch(`http://localhost/api/Client/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
        inputId.value = result.idClient
        inputName.value = result.name
        inputEmail.value = result.email
        inputPassword.value = result.password
        inputAge.value = result.age
    })
    .catch(error => console.log('error', error));
}

function eliminar(){
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
    };
    
    fetch(`http://localhost/api/Client/${inputId.value}`, requestOptions)
    .then(response => window.location.reload())
    .catch(error => console.log('error', error));
}

function actualizar(){
    
}

function crear(){
    
}

function limpiarInput(){

}

function btnAdd(){
    btnModalFooter[0].style.display = "block"
    btnModalFooter[1].style.display = "none"
    btnModalFooter[2].style.display = "none"
}

function btnDetails(id){
    btnModalFooter[0].style.display = "none"
    btnModalFooter[1].style.display = "block"
    btnModalFooter[2].style.display = "block"
    obtenerPorId(id)
}

obtener()