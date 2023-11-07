const express = require('express');
const cors = require('cors');
const { socketController } = require('./sockets/controller');
require('dotenv').config()

// const mainRouter = require('./routes/index')

const port = process.env.PORT || 8080
const app = express();

// socket.io

const server = require('http').createServer(app); // creamos el servidor de socket y le mando el servidor de express
const io = require('socket.io')(server); // se utilizará para interactuar con el servidor de Socket.IO


io.on('connection', socketController);


//Se levanta el servidor de socket en el puerto
server.listen(port, () => {
  console.log(`%s listening at ${port}`)
});



// Midlewares

app.use(express.json()); // Lectura y parseo del body

app.use(cors()) // Cors

// app.use('/api', mainRouter);  // Ruta principal

app.use(express.static('public')); // Directorio Public




