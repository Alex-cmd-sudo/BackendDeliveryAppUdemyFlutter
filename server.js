const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');

/*
Importar rutas
*/
const usersRoutes = require('./routes/userRoutes');

const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.disable('x-power-by');
app.set('port', port);

/*
Llamado de rutas
*/
usersRoutes(app);

server.listen(3000, '192.168.3.91' || 'localhost', function() {
    console.log('Aplicacion de NodeJS ' + process.pid + ' Iniciada...');
});

app.get('/', (req, res) => {
    res.send('Ruta raiz back');
});

app.get('/test', (req, res) => {
    res.send('Ruta raiz test');
});

//Error handler
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});