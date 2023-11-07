const TicketControl = require("../ticketControl");

const ticketControl = new TicketControl();

const socketController = (socket) => {

    // Cuando un cliente se conecta
    socket.emit( 'ultimo-ticket', ticketControl.ultimo);
    socket.emit( 'estado-actual', ticketControl.ultimos4); // disparamos el evento
    socket.emit( 'tickets-pendientes', ticketControl.tickets.length);



    socket.on('siguiente-ticket', ( payload, callback ) => { // escucha el mensaje q envia el cliente "enviar-mensaje"
        
        const siguiente = ticketControl.siguiente();

        callback(siguiente);

        
        socket.broadcast.emit( 'tickets-pendientes', ticketControl.tickets.length);
    })


    socket.on('atender-ticket', ({ escritorio }, callback) => {
        if (!escritorio) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            })
        }

        const ticket = ticketControl.atenderTicket(escritorio);

        // TODO: notificar que hay un nuevo ticket pendiente de asignar
        socket.broadcast.emit( 'estado-actual', ticketControl.ultimos4);
        socket.emit( 'tickets-pendientes', ticketControl.tickets.length);
        socket.broadcast.emit( 'tickets-pendientes', ticketControl.tickets.length);


        if (!ticket) {
            return callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            })
        } else {
            return callback({
                ok: true,
                ticket
            })
        }
    })

};




module.exports = {
    socketController
}