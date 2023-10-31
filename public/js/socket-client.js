

// Referencias del HTML
const lblOnline = document.querySelector("#lblOnline" );
const lblOffline = document.querySelector("#lblOffline");
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');


// este es mi cliente
const socket = io();

// Listener
socket.on('connect', () =>{ // sirve para saber cuando esta conectado el servidor
    // console.log('Conectado al servidor');

    lblOffline.style.display = 'none'; // cuando este conectado no se va a ver el OFFLINE
    lblOnline.style.display = '';
});

socket.on('disconnect', () =>{ // sirve para saber cuando esta desconectado el servidor
    // console.log('Desconectado del servidor');

    lblOffline.style.display = ''; 
    lblOnline.style.display = 'none'; // cuando este desconectado no se va a ver el ONLINE
});


socket.on('enviar mensaje', (payload) => { // el cliente escucha el mensaje q le manda el server
    console.log(payload);
})


btnEnviar.addEventListener( 'click', () => {

    const mensaje = txtMensaje.value;

    const payload = { // se manda un payload con un objeto para mandar mas info
        mensaje,
        id: '123ABC',
        fecha: new Date().getTime()
    }

    socket.emit('enviar-mensaje', payload, (id) => { // emite el evento y envia un mensaje al servidor
        console.log('desde el server', id);
    }); // el tercer argumento es un callback que recibe el id q manda el server (solo lo recibe el cliente que ejecuta la accion)
})