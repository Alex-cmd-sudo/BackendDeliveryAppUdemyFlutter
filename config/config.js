const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'jan_271194',
    database: 'udemy_app_delivery_flutter'
});

db.connect(function(err){
    if(err) throw err;
    log.log('Database connected!')
});

module.exports = db;