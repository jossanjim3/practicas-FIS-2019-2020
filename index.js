var express = require('express');
var bodyParser = require('body-parser');
// usado para hacer persistencia en fichero
var DataStore = require('nedb');

// NOTA: NO FUNCIONA LA PARTE DE NEDB
/*
Es un problema de node, nedb no funciona en un container remoto en windows con node.js y mongo.db
He hablado de este problema con Manuel y me dijo de trabajar fuera del container mientras que utilizamos nedb
*/

// var port = 3000; // esto para trabajar en localhost esta bien pero para desplegar en heroku no
var port = (process.env.PORT || 3000); // leemos de la variable de entorno port, y si no hay valor elegimos 3000 por defecto.
var BASE_API_PATH = "/api/v1";
// variable que indica la ruta donde se almacenaran los datos en fichero
var DB_FILE_NAME = __dirname + "/contacts.json";

console.log("Starting API server...");
//console.log(DB_FILE_NAME);

var app = express();
app.use(bodyParser.json());

// usamos nedb para crear un BB.DD. en fichero
// Type 3: Persistent datastore with automatic loading

// creamos e inicializamos la BB.DD. en fichero
// da error el autoload : true
var db = new DataStore({
    filename : DB_FILE_NAME,
    //filename : "/workspace/contacts.json",
    autoload: true
});

// metodo root
app.get("/",(req, res) => {
    console.log(" - ROOT");
    res.send("<html><body><h1>My server is running... JD</h1></body></html>");

});

// metodo GET usando variable temporal
app.get(BASE_API_PATH + "/contacts", (req, res) => {
    console.log(Date() + " - GET /contacts");
    // como el filtro el vacio {} devuelve todos los elementos de los contactos
    db.find({}, (err, contacts) => {
        if (err) {
            console.log(Date() + " - " + err);
            res.sendStatus(500);
        } else {
            
            //res.send(contacts); // devuelve todos los campos de los contactos, incluido el _id

            // elimina el elemento _id de la lista de los contactos que no queremos que aparezca
            res.send(contacts.map((contact) => {
                delete contact._id;
                return contact;
            }));
        }
    });
});

// metodo POST usando nedb
app.post(BASE_API_PATH + "/contacts", (req, res) => {
    console.log(Date() + " - POST /contacts");
    var contact = req.body; //para que funcione esto tienes que añadir body-parser
    //console.log(" - req.body => contact: " + contact);

    db.insert(contact, function(err, record) {
        if (err) {
            console.log(Date() + " - " + err);
            res.sendStatus(500);
        } else {
            console.log(record._id);
            res.sendStatus(201);
        }
    });    
});

// metodo PUT usando variable temporal, actualiza registro y muestralo en consola
app.put({
    
});

// metoto DELETE usando variable temporal que borra todo
app.delete({

});


app.listen(port);

console.log("Server ready");