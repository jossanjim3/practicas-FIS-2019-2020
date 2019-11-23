var express = require('express');
var bodyParser = require('body-parser');

var port = 3000;
var BASE_API_PATH = "/api/v1";

console.log("Starting API server...");
//console.log(DB_FILE_NAME);

var app = express();
app.use(bodyParser.json());

// metodo root
app.get("/",(req, res) => {
    console.log(" - ROOT");
    res.send("<html><body><h1>My server is running... JD</h1></body></html>");

});

 // creamos una variable temporal contacts con los contactos de prueba
var contacts = [ 
    {"id": 1, "name" : "peter", "phone": 12345 }, 
    {"id": 2, "name" : "john", "phone": 6789} 
];

//var contacts = [];

// metodo GET usando variable temporal
app.get(BASE_API_PATH + "/contacts", (req, res) => {
    console.log(Date() + " - GET /contacts");
    console.log("contacts length: " + contacts.length);

    //res.send(contacts);

    if(contacts.length == 0){
        res.status(404); // error
        res.json({message: 'No contacts found'});
                
    }
    res.json(contacts);
    res.status(200); // ok  
}); 

// metodo GET filtrado usando variable temporal
app.get(BASE_API_PATH + "/contacts/:id", (req, res) => {
    console.log(Date() + " - GET /contacts:id");

    var resId = req.params.id;
    console.log("resId: " + resId);
    
    // vamos a filtrar por el id 2    
    // Here find function returns the value of the first element 
    // in the array that satisfies the provided testing 
    var contact = contacts.find(function(element){
        return element.id == resId;
    });
    console.log(contact.id);
    res.send(contact);  

}); 

// metodo POST usando variable temporal
app.post(BASE_API_PATH + "/contacts", (req, res) => {
    console.log(Date() + " - POST /contacts");
    var contact = req.body; //para que funcione esto tienes que añadir body-parser
    contacts.push(contact);
    res.sendStatus(201); // created
});

// metodo PUT usando variable temporal, actualiza registro y muestralo en consola
app.put(BASE_API_PATH + "/contacts:id", (req, res) => {
    console.log(Date() + " - PUT /contacts");
    // como el filtro el vacio {} devuelve todos los elementos de los contactos
    db.find({}, (err) => {
        if (err) {
            console.log(Date() + " - " + err);
            res.sendStatus(500);
        } else {
            res.sendStatus(201);

            //res.send(contacts); // devuelve todos los campos de los contactos

            // elimina el elemento _id de la lista de los contactos
            res.send(contacts.map((contact) => {
                delete contact._id;
                return contact;
            }));
        }
    }); 
});

// metoto DELETE usando variable temporal que borra todo
app.delete({

});

app.listen(port);

console.log("Server ready");