var express = require('express');
var bodyParser = require('body-parser');

var port = 3000;
var BASE_API_PATH = "/api/v1";

console.log("Starting API server...");
//console.log(DB_FILE_NAME);

var app = express();
app.use(bodyParser.json());

/*
NOTA: cuando arranques el docker y hagas npm start tienes que hacer lo de F1 y la opcion Remote Containers - Forward port to container...
*/

 // creamos una variable temporal contacts con los contactos de prueba
var contacts = [ 
    {"id": 1, "name" : "peter", "phone": 12345, "enable": 0}, 
    {"id": 2, "name" : "john",  "phone": 54321, "enable": 0} 
];

//var contacts = [];

// metodo get ROOT
// url -> http://localhost:3000/api/v1/contacts
app.get("/",(req, res) => {
    console.log(" - ROOT");
    res.send("<html><body><h1>My server is running... JD</h1></body></html>");

});

// metodo GET usando variable temporal
// url -> http://localhost:3000/api/v1/contacts
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
// url -> http://localhost:3000/api/v1/contacts/2
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
// url -> http://localhost:3000/api/v1/contacts
// body -> {"id": "3", "name" : "jd", "phone": 789562314 }
app.post(BASE_API_PATH + "/contacts", (req, res) => {
    console.log(Date() + " - POST /contacts");
    console.log("req.body: " + req.body.name);
    var contact = req.body; //para que funcione esto tienes que añadir body-parser
    contacts.push(contact);
    res.sendStatus(201); // created
});


// metodo PUT usando variable temporal, actualiza registro y muestralo en consola
// url -> http://localhost:3000/api/v1/contacts/2
// body -> {"id": "3", "name" : "jd", "phone": 789562314 }
app.put(BASE_API_PATH + "/contacts/:id", (req, res) => {
    console.log(Date() + " - PUT /contacts");
    
    var resId = req.params.id;
    console.log("resId: " + resId);
    
    // observamos el nombre que le vamos a modificar
    var contact = req.body; // el json lo hacemos como contacto
    console.log("nombre nuevo: " + contact.name);
    
    // filtramos en la variable contacts por el id pasado por parametro
    
    //devuelve el indice donde se encuentra
    contactFilter = contacts.filter(contactFilter => {
        return contactFilter.id == resId;
    })[0];
    console.log("contactFilter: " + contactFilter);

    var index = contacts.indexOf(contactFilter);
    console.log("index: " + index);

    contactFilter.name = contact.name;
    console.log("nombre despues de put: " + contactFilter.name);
    
    res.send(contactFilter);
});

// hacer metodo put que modifique la variable enable de todos los contactos todos a 2
// url -> http://localhost:3000/api/v1/contacts/enable_active
app.put(BASE_API_PATH + "/contacts/enable_active", (req, res) => {
    console.log(Date() + " - PUT /contacts/enable_active");
    
    res.json({message: "hacer enable = 0"});
    
});

// metoto DELETE usando variable temporal que borra todo
app.delete({

});

app.listen(port);

console.log("Server ready");