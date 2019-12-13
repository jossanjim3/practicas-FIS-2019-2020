const mongoose = require('mongoose');
// si configuramos variable de entorno o por defecto
//const DB_URL = (process.env.MONGO_URL || 'mongodb://mongo/test')
const DB_URL = (process.env.MONGO_URL || 'mongodb://localhost/test') // me crea una bbdd llamada test

const dbConnect = function(){
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error: '));
    return mongoose.connect(DB_URL, {useNewUrlParser: true});
}

module.exports = dbConnect;