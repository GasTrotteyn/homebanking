window.onload= cargaPagina;


async function sendForm(){
    event.preventDefault();
    const usuario = getUser();
    await postUsusario(usuario);
    let form = document.getElementById('formularioRegistro');
    form.reset();
};

async function postUsusario(usuario){
    fetch('http://localhost:3001/usuarios', {
        method: 'POST',
        headers: {
            'Accept': 'aplication/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify(usuario)
    })
    .then(function(res) {
        return res.json()
    })
    .then(function(res){
        console.log(res)
    })
    .catch(function(res) {console.log(res)})
};

function getUser () {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const usuario= document.getElementById('usuarioRegistro').value;
    const password = document.getElementById('passwordRegistro').value;
    return {
        nombre: nombre,
        apellido: apellido,
        usuario: usuario,
        password: password
    }
};

function eventos(){
    document.getElementById('formularioRegistro').addEventListener('submit', sendForm)
};

function cargaPagina(){
    eventos();
}