var express = require('express');
var bodyParser = require('body-parser');

// NOTA: NO FUNCIONA LA PARTE DE NEDB
/*
Es un problema de node, nedb no funciona en un container en windows
He hablado de este problema con Manuel y me dijo de trabajar fuera del container mientras que utilizamos nedb
*/

// usado para hacer persistencia en fichero
var DataStore = require('nedb');

var port = 3000;
var BASE_API_PATH = "/api/v1";
// variable que indica la ruta donde se almacenaran los datos en fichero
var DB_FILE_NAME = __dirname + "/contacts.json";

console.log("Starting API server...");
//console.log(DB_FILE_NAME);

var app = express();
app.use(bodyParser.json());

// metodo root
app.get("/",(req, res) => {
    console.log(" - ROOT");
    res.send("<html><body><h1>My server is running... JD</h1></body></html>");

});

/* // creamos una variable temporal contacts con los contactos de prueba
var contacts = [ 
    {"name" : "peter", "phone": 12345 }, 
    {"name" : "john", "phone": 6789} 
]; */

/* // metodo GET usando variable temporal
app.get(BASE_API_PATH + "/contacts", (req, res) => {
    console.log(Date() + " - GET /contacts");
    res.send(contacts);
})

// metodo POST usando variable temporal
app.post(BASE_API_PATH + "/contacts", (req, res) => {
    console.log(Date() + " - POST /contacts");
    var contact = req.body; //para que funcione esto tienes que añadir body-parser
    contacts.push(contact);
    res.sendStatus(201);
}) */


// usamos nedb para crear un BB.DD. en fichero
// Type 3: Persistent datastore with automatic loading

// creamos e inicializamos la BB.DD. en fichero
// da error el autoload : true
var db = new DataStore({
    //filename : DB_FILE_NAME,
    filename : "/workspace/contacts.json",
    autoload: true
});
// otra forma de configurar la persistencia en fichero
/* var db = new DataStore({
    filename : DB_FILE_NAME,    
});
db.loadDatabase(function (err) {    // Callback is optional
    // Now commands will be executed
  });
   */
// You can issue commands right away

// metodo GET usando variable temporal
app.get(BASE_API_PATH + "/contacts", (req, res) => {
    console.log(Date() + " - GET /contacts");
    // como el filtro el vacio {} devuelve todos los elementos de los contactos
    db.find({}, (err) => {
        if (err) {
            console.log(Date() + " - " + err);
            res.sendStatus(500);
        } else {
            
            //res.send(contacts); // devuelve todos los campos de los contactos

            // elimina el elemento _id de la lista de los contactos
            res.send(contacts.map((contact) => {
                delete contact._id;
                return contact;
            }));
        }
    });
});

// metodo POST usando variable temporal
app.post(BASE_API_PATH + "/contacts", (req, res) => {
    console.log(Date() + " - POST /contacts");
    var contact = req.body; //para que funcione esto tienes que añadir body-parser
    //console.log(" - req.body => contact: " + contact);

    db.insert(contact, function(err, record) {
        if (err) {
            console.log(Date() + " - " + err);
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    });    
});
<<<<<<< HEAD
=======

// metodo PUT usando variable temporal, actualiza registro y muestralo en consola
app.put({
    
});

// metoto DELETE usando variable temporal que borra todo
app.delete({

});

>>>>>>> CRUD-contacts

app.listen(port);

console.log("Server ready");