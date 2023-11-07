const path = require('path');
const fs   = require('fs');

class Ticket {
    constructor( numero, escritorio ) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}


class TicketControl {

    constructor() {
        this.ultimo   = 0;
        this.hoy      = new Date().getDate(); // 11
        this.tickets  = [];
        this.ultimos4 = [];

        this.init(); // ejecuta el metodo init
    }

    get toJson() {
        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4,
        }
    }

    init() {
        const { hoy, tickets, ultimo, ultimos4 } = require('./db/data.json');
        if ( hoy === this.hoy ) {
            console.log('mismo dia');
            this.tickets  = tickets;
            this.ultimo   = ultimo;
            this.ultimos4 = ultimos4;
        } else {
            // Es otro dia
            this.guardarDB();
        }
    }

    guardarDB() {

        console.log('otro dia');
        const dbPath = path.join( __dirname, './db/data.json' ); // Se construye la ruta al archivo JSON q almacenar los datos
        
        fs.writeFileSync( dbPath, JSON.stringify( this.toJson ) );// se guardan los datos en el archivo data.json

    }

    siguiente() {
        this.ultimo += 1; // ACUMULADOR

        const ticket = new Ticket( this.ultimo, null ); // la primera posicion es el numero del ticket
        this.tickets.push( ticket ); // añado el ticket al array de ticket que esta en el constructor

        this.guardarDB(); // guarda en base de datos
        return 'Ticket ' + ticket.numero; // retorna el ticket con su numero
    }

    atenderTicket( escritorio ) {

        // No tenemos tickets
        if ( this.tickets.length === 0 ) {
            return null;
        }

        const ticket = this.tickets.shift(); // saca el primer ticket del array

        ticket.escritorio = escritorio; // se le asigna el escritorio que viene por argumento

        this.ultimos4.unshift( ticket ); // lo agregasmos al array de ultimos4

        if ( this.ultimos4.length > 4 ) { // validamos de que solo hayan 4 elementos en el array
            this.ultimos4.splice(-1,1); // elimina si hay uno de mas
        }

        this.guardarDB();

        return ticket;
    }
}


// new TicketControl();
module.exports = TicketControl;
