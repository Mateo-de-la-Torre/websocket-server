


const socketController = (socket) => {
    console.log('Client conectado', socket.id);

    socket.on('disconnect', () => {
        console.log('Client desconectado', socket.id);
    });

    socket.on('enviar-mensaje', ( payload, callback ) => { // escucha el mensaje q envia el cliente "enviar-mensaje"
        
        socket.broadcast.emit('enviar mensaje', payload) // para que el mensaje que mande el client le llegue a todos los clientes conectados menos a el qe lo envia

        const id = 123456;
        callback(id); // se lo envia solo al cliente q ejecuta la accion
    })

};




module.exports = {
    socketController
}