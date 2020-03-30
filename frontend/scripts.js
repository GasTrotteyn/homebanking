window.onload = cargaPagina;

//// Enviar formulario de registro///////////////////

async function sendForm() {
    event.preventDefault();
    const usuario = getUser();
    await postUsusario(usuario);
    let form = document.getElementById('formularioRegistro');
    form.reset();
};

async function postUsusario(usuario) {
    fetch('http://localhost:3001/usuarios', {
        method: 'POST',
        headers: {
            'Accept': 'aplication/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify(usuario)
    })
        .then(function (res) {
            return res.json()
        })
        .then(function (res) {
            console.log(res);
            mostrarExitoRegistro();
        })
        .catch(function (res) {
            //console.log(res);
            mostrarUsuarioYaExiste();
        })
};

function mostrarExitoRegistro() {
    let msjExito = document.createElement('div');
    msjExito.className = 'msjExito';
    msjExito.innerHTML = 'Usted se ha registrado correctamante!'
    let mensajeRegistro = document.getElementById('mensajeRegistro');
    mensajeRegistro.innerHTML = '';
    mensajeRegistro.appendChild(msjExito);
}

function mostrarUsuarioYaExiste() {
    let msjYaExiste = document.createElement('div');
    msjYaExiste.className = 'msjExito';
    msjYaExiste.innerHTML = 'Ese usuario ya existe!'
    let mensajeRegistro = document.getElementById('mensajeRegistro');
    mensajeRegistro.innerHTML = '';
    mensajeRegistro.appendChild(msjYaExiste);
}

function getUser() {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const usuario = document.getElementById('usuarioRegistro').value;
    const password = document.getElementById('passwordRegistro').value;
    return {
        nombre: nombre,
        apellido: apellido,
        usuario: usuario,
        password: password
    }
};

/// enviar login ///////////////

function getLogin() {
    const usuario = document.getElementById('usuarioLogin').value;
    const password = document.getElementById('passwordLogin').value;
    return {
        usuario: usuario,
        password: password
    }
}

function postLogin(usuarioLogueado) {
    fetch('http://localhost:3001/usuarios/login',
        {
            method: 'POST',
            headers: {
                'Accept': 'aplication/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(usuarioLogueado)
        })
        .then(function (res) {
            console.log(res.status);
            if(res.status === 200){
                mostrarExitoLogin();
            }else{
                mostrarErrorLogin();
            }
        })
}

async function sendLogin(event) {
    event.preventDefault();
    const usuarioLogueado = getLogin();
    await postLogin(usuarioLogueado);
    let form = document.getElementById('formularioRegistro');
    form.reset();
}

function mostrarExitoLogin() {
    let msjExito = document.createElement('div');
    msjExito.className = 'msjExito';
    msjExito.innerHTML = 'Usted se ha logueado correctamante!'
    let mensajeLogin = document.getElementById('mensajeLogin');
    mensajeLogin.innerHTML = '';
    mensajeLogin.appendChild(msjExito);
    document.getElementById('ventanaDeposito').style.display = 'block';
    document.getElementById('ventanaTransferencias').style.display = 'block';
}

function mostrarErrorLogin() {
    let msjExito = document.createElement('div');
    msjExito.className = 'msjExito';
    msjExito.innerHTML = 'El usuario o la contraseña son incorrectos'
    let mensajeLogin = document.getElementById('mensajeLogin');
    mensajeLogin.innerHTML = '';
    mensajeLogin.appendChild(msjExito);
}





function eventos() {
    document.getElementById('formularioRegistro').addEventListener('submit', sendForm);
    document.getElementById('formularioLogin').addEventListener('submit', sendLogin)
};

function cargaPagina() {
    eventos();
}