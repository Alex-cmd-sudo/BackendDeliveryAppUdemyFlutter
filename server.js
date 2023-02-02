const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const passoport = require('passport');
const multer = require('multer');

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
app.use(passoport.initialize());
app.use(passoport.session());

require('./config/passport')(passoport);

app.disable('x-power-by');
app.set('port', port);

const upload = multer({
    storage: multer.memoryStorage()
});

/*
Llamado de rutas
*/
usersRoutes(app, upload);

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