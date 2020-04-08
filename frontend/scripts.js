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
            mostrarExitoRegistro();
        })
        .catch(function (res) {
            mostrarUsuarioYaExiste();
        })
};

function mostrarExitoRegistro() {
    let msjExito = document.createElement('div');
    msjExito.className = 'mjeExito';
    msjExito.innerHTML = 'Usted se ha registrado correctamante!'
    let mensajeRegistro = document.getElementById('mensajeRegistro');
    mensajeRegistro.style.display = 'block';
    document.getElementById('registro').style.display = 'none';
    mensajeRegistro.appendChild(msjExito);
}

function mostrarUsuarioYaExiste() {
    let msjYaExiste = document.createElement('div');
    msjYaExiste.className = 'msjExito';
    msjYaExiste.innerHTML = 'Ese usuario ya existe!'
    let mensajeRegistro = document.getElementById('mensajeRegistro');
    mensajeRegistro.style.display = 'block';
    document.getElementById('registro').style.display = 'none';
    mensajeRegistro.insertAdjacentElement('afterbegin', msjYaExiste);
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

let usuarioLogueado = '';
function getLogin() {
    const usuario = document.getElementById('usuarioLogin').value;
    const password = document.getElementById('passwordLogin').value;
    return {
        usuario: usuario,
        password: password
    }
}

let token = '';

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
        .then(async function (res) {
            if (res.status === 200) {
                usuarioLogueadoActual = usuarioLogueado.usuario;
                token = await res.json();
                mostrarExitoLogin();
            } else {
                mostrarErrorLogin();
            }
        })
}

async function sendLogin(event) {
    event.preventDefault();
    const usuarioLogueado = getLogin();
    await postLogin(usuarioLogueado);
    let form = document.getElementById('formularioLogin');
    form.reset();
}

function mostrarExitoLogin() {
    let msjExito = document.createElement('div');
    msjExito.className = 'msjExito';
    msjExito.innerHTML = 'Usted se ha logueado correctamante!'
    let mensajeLogin = document.getElementById('mensajeLogin');
    mensajeLogin.insertAdjacentElement('afterbegin', msjExito);

    document.getElementById('formularioLogin').style.display = 'none';
    document.getElementById('btnsLogin').style.display = 'block';
    document.getElementById('mensajeLogin').style.display = 'block';
}

function mostrarErrorLogin() {
    let msjExito = document.createElement('div');
    msjExito.className = 'msjExito';
    msjExito.innerHTML = 'El usuario o la contraseña son incorrectos'
    let mensajeLogin = document.getElementById('mensajeLogin');
    mensajeLogin.insertAdjacentElement('afterbegin', msjExito);
    document.getElementById('formularioLogin').style.display = 'none';
    document.getElementById('mensajeRegistro').style.display = 'block';
    document.getElementById('mensajeLogin').style.display = 'block';
}

//////////////// deposito ///////////////

let usuarioLogueadoActual = '';

function getDeposito() {
    const montoDepositado = document.getElementById('montoDepositado').value;
    return {
        monto: montoDepositado
    }
}

async function postDeposito(montoDeposito) {
    let url = 'http://localhost:3001/usuarios/' + usuarioLogueadoActual + '/depositos';
    let deposito = await fetch(url,
        {
            method: 'POST',
            headers: {
                'Accept': 'aplication/json',
                'Content-type': 'application/json',
                'Authorization': `bearer ${token.token}`
            },
            body: JSON.stringify(montoDeposito)
        })
    let depositojson = await deposito.json();
    if (depositojson) {
        return depositojson;
    } else {
        mostrarErrorDeposito();
    }
}

async function sendDeposito(event) {
    event.preventDefault();
    const deposito = getDeposito();
    let res = await postDeposito(deposito);
    let saldo = res.saldo;
    let form = document.getElementById('formularioDeposito');
    form.reset();
    mostrarExitoDeposito(saldo);
}

function mostrarExitoDeposito(saldo) {
    let msjExito = document.createElement('div');
    msjExito.className = 'msjExito';
    msjExito.innerHTML = `Depósito recibido, su nuevo saldo es ${saldo}`
    let mensajeDeposito = document.getElementById('mensajeDeposito');
    mensajeDeposito.innerHTML = '';
    mensajeDeposito.insertAdjacentElement('afterbegin', msjExito);
    document.getElementById('ventanaDeposito').style.display = 'none';
    document.getElementById('mensajeDeposito').style.display = 'block';
}

function mostrarErrorDeposito() {
    let msjExito = document.createElement('div');
    msjExito.className = 'msjExito';
    msjExito.innerHTML = 'Algo salió mal'
    let mensajeDeposito = document.getElementById('mensajeDeposito');
    mensajeDeposito.insertAdjacentElement('afterbegin', msjExito);
    document.getElementById('ventanaDeposito').style.display = 'none';
    document.getElementById('mensajeDeposito').style.display = 'block'
}

/////////////  TRANSFERENCIAS ///////////////

function getTransferencia() {
    const montoTransferido = document.getElementById('montoTransferido').value;
    const ususarioReceptor = document.getElementById('usuarioReceptor').value;
    return {
        usuario: usuarioLogueadoActual,
        monto: montoTransferido,
        receptor: ususarioReceptor
    }
}

async function postTransferencia(transferencia) {

    let url = 'http://localhost:3001/usuarios/transferencias';
    let res = await fetch(url,
        {
            method: 'POST',
            headers: {
                'Accept': 'aplication/json',
                'Content-type': 'application/json',
                'Authorization': `bearer ${token.token}`
            },
            body: JSON.stringify(transferencia)
        })
    if (res.status === 200) {
        let resjson = await res.json();
        return resjson;
    } else if (res.status === 201) {
        mostrarErrorTransferencia();
    } else {
        mostrarErrorTransferenciaNoUsuario();
    }
}

async function sendtransferencia(event) {
    event.preventDefault();
    const transferencia = getTransferencia();
    let res = await postTransferencia(transferencia);
    let saldoUsuario = res.saldoEmisor;
    let form = document.getElementById('formularioTransferencias');
    form.reset();
    mostrarExitoTransferencia(saldoUsuario);
}

function mostrarExitoTransferencia(saldo) {
    let msjExito = document.createElement('div');
    msjExito.className = 'msjExito';
    msjExito.innerHTML = `Trasnferencia exitosa, su nuevo saldo es ${saldo}`
    let mensajeTransferencia = document.getElementById('mensajeTransferencia');
    mensajeTransferencia.innerHTML = '';
    mensajeTransferencia.insertAdjacentElement('afterbegin', msjExito);
    document.getElementById('formularioTransferencias').style.display = 'none';
    document.getElementById('mensajeTransferencia').style.display = 'block';
}

function mostrarErrorTransferencia() {
    let msjExito = document.createElement('div');
    msjExito.className = 'msjExito';
    msjExito.innerHTML = 'No te da el cuero papu'
    let mensajeTransferencia = document.getElementById('mensajeTransferencia');
    mensajeTransferencia.insertAdjacentElement('afterbegin', msjExito);
    document.getElementById('formularioTransferencias').style.display = 'none';
    document.getElementById('mensajeTransferencia').style.display = 'block';
}

function mostrarErrorTransferenciaNoUsuario() {
    let msjExito = document.createElement('div');
    msjExito.className = 'msjExito';
    msjExito.innerHTML = 'El usuario receptor no está registrado en este banco'
    let mensajeTransferencia = document.getElementById('mensajeTransferencia');
    mensajeTransferencia.insertAdjacentElement('afterbegin', msjExito);
    document.getElementById('formularioTransferencias').style.display = 'none';
    document.getElementById('mensajeTransferencia').style.display = 'block';
}

function volverARecienLogueado() {
    document.getElementById('mensajeDeposito').style.display = 'none';
    document.getElementById('btnsLogin').style.display = 'block';
    document.getElementById('btnDepositoSalir').style.display = 'none';
    document.getElementById('ventanaDeposito').style.display = 'none';
    document.getElementById('ventanaTransferencias').style.display = 'none';
}

////funciones de display /////////////

function ingresarApp() {
    let portada = document.getElementById('portada');
    let formularioLogin = document.getElementById('formularioIngresar');
    portada.style.display = 'none';
    formularioLogin.style.display = 'block'
}
function registrarse() {
    let portada = document.getElementById('portada');
    let formRegistro = document.getElementById('registro');
    portada.style.display = 'none';
    formRegistro.style.display = 'block';
    document.getElementById('mensajeRegistro').style.display = 'none';
}
function depositar() {
    document.getElementById('mensajeLogin').style.display = 'none';
    document.getElementById('btnsLogin').style.display = 'none';
    document.getElementById('ventanaDeposito').style.display = 'block';
    document.getElementById('btnDepositoSalir').style.display = 'block'
}
function transferir() {
    document.getElementById('mensajeLogin').style.display = 'none';
    document.getElementById('btnsLogin').style.display = 'none';
    document.getElementById('ventanaTransferencias').style.display = 'block';
    document.getElementById('btnTransferenciaSalir').style.display = 'block';
    document.getElementById('formularioTransferencias').style.display = 'flex';
    document.getElementById('mensajeTransferencia').style.display = 'none';
}

function eventos() {
    document.getElementById('formularioRegistro').addEventListener('submit', sendForm);
    document.getElementById('formularioLogin').addEventListener('submit', sendLogin);
    document.getElementById('ingresar').addEventListener('click', ingresarApp);
    document.getElementById('registrar').addEventListener('click', registrarse);
    document.getElementById('depositar').addEventListener('click', depositar);
    document.getElementById('transferir').addEventListener('click', transferir);
    document.getElementById('registrarme').addEventListener('click', registrarse);
    document.getElementById('enviarDeposito').addEventListener('click', sendDeposito);
    document.getElementById('btnDepositoSalir').addEventListener('click', volverARecienLogueado);
    document.getElementById('btnTransferenciaSalir').addEventListener('click', volverARecienLogueado);
    document.getElementById('enviarTransferencia').addEventListener('click', sendtransferencia);
};

function cargaPagina() {
    eventos();
}
