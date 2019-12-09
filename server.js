const db = require('./db.js');

var express = require('express');
var bodyParser = require('body-parser');

var BASE_API_PATH = "/api/v1";

var app = express();
app.use(bodyParser.json());

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

module.exports = app;