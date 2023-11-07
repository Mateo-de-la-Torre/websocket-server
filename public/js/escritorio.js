// Referencias HTML
const lblEscritorio = document.querySelector('h1');
const btnAtender    = document.querySelector('button');
const lblTicket     = document.querySelector('small');
const divAlerta     = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');



const searchParams = new URLSearchParams( window.location.search ); 

if ( !searchParams.has('escritorio') ) { // si la palabra escritorio no esta en la url
    window.location = 'index.html'; //  redirecciona al index
    throw new Error('El escritorio es obligatorio');
}


const escritorio = searchParams.get('escritorio'); // para ver cual es el nombre del escritorio
lblEscritorio.innerText = escritorio;

divAlerta.style.display  = 'none';

const socket = io();



socket.on('connect', () => {

    btnAtender.disabled = false;

});

socket.on('disconnect', () => {

    btnAtender.disabled = true; // si esta desconectado no aparece el botton
});

socket.on('tickets-pendientes', (pendientes) => {
    if (pendientes === 0) {
        lblPendientes.style.display = 'none'; 
    } else {
        lblPendientes.style.display = '';
        lblPendientes.innerText = pendientes;
        divAlerta.style.display  = 'none';
    }
});


btnAtender.addEventListener( 'click', () => { // evento al clickear el botton

    socket.emit( 'atender-ticket', {escritorio}, ( { ok, ticket } ) => {
        if (!ok) {
            lblTicket.innerText = 'Nadie.'
            divAlerta.style.display  = '';
        }

        lblTicket.innerText = 'Ticket ' + ticket.numero;

    })

});