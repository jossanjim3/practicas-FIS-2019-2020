var express = require('express');
var bodyParser = require('body-parser'); //req.body

var hostname = 'localhost';
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
    {"id": 1, "name" : "peter", "phone": 12345, "activo": 1, "enable": 0}, 
    {"id": 2, "name" : "john",  "phone": 54321, "activo": 0, "enable": 0}, 
    {"id": 3, "name" : "esther",  "phone": 45678, "activo": 1, "enable": 0},
    {"id": 4, "name" : "maria",  "phone": 56434, "activo": 0, "enable": 0},
    {"id": 5, "name" : "paco",  "phone": 67687, "activo": 0, "enable": 0} 
];
console.log("Contacts: ");
console.log(contacts);

//contacts = require('./data')

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
// url -> http://localhost:3000/api/v1/contacts_enable
app.put(BASE_API_PATH + "/contacts_enable", (req, res) => {
    console.log(Date() + " - PUT /contacts_enable -> hacer enable = 0");
    
    console.log("contacts length: " + contacts.length);
    
    // for each 1
    console.log("----------  for each 1 ---------- ");
    contacts.forEach(function(valor, indice,array){
        console.log(`En el indice ${indice} hay este valor Id: ${valor.id} y valor name: ${valor.name} `);
    });

    // for each 2
    console.log("---------- for each 2 ---------- ");
    // ES6
    Object.keys(contacts).forEach(key => console.log(key, contacts[key]));
     
    // ES5
    Object.keys(contacts).forEach(function(key) {
        console.log(key, contacts[key].id);
        console.log(key, contacts[key].name);
    })    

    // for each 3
    console.log("---------- for each 3 ---------- ");
    for (var i = 0; i < contacts.length; i+=1) {
        console.log("En el índice '" + i + "' hay este valor: " + contacts[i].name);
    }

    // for each 4
    console.log("---------- for each 4 ---------- ");
    //var miArray = [ 2, 4, 6, 8, 10 ];
    for (var contact in contacts) {
    console.log("En el índice '" + contact + "' hay este valor: " + contacts[contact].name);
    }
     
    // for each 5
    console.log("---------- for each 5 ---------- ");
    //var miObjeto = { "marca":"audi", "edad":2 };
    for (var contact in contacts) {
        if (contacts.hasOwnProperty(contact)) {
            console.log("En la propiedad '" + contact + "' hay este valor: " + contacts[contact].name);
        }
    }

    // for each 6
    console.log("---------- for each 6 ---------- ");
    //var miArray = [ 2, 4, 6, "hola", "mundo" ];
    for (var contact of contacts) {
        console.log("Contact: " + contact.name);
    }

    // modificar la variable enable a 1 de aquellos que tienen valor activo = 1 y mostrar el resultado
    console.log("---------- ENABLE A 1 ---------- ");
    //var miObjeto = { "marca":"audi", "edad":2 };
    for (var contact in contacts) {
        if (contacts.hasOwnProperty(contact)) {
            //console.log("En la propiedad '" + contact + "' hay este valor: " + contacts[contact].name);
            var activo = contacts[contact].activo;
            if(activo == 1){
                contacts[contact].enable = 1;
            }
        }
    }
    res.send(contacts);
    
});

// metoto DELETE usando variable temporal que borra todo
// url -> http://localhost:3000/api/v1/contacts/2
app.delete(BASE_API_PATH + "/contacts/:id", (req, res) => {

    var reqId = req.params.id;
    console.log("vamos a borrar el id: " + reqId);

    //devuelve el indice donde se encuentra
    contactFilter = contacts.filter(contactFilter => {
        return contactFilter.id == reqId;
    })[0];
    console.log("contactFilter: " + contactFilter.id +" - "+ contactFilter.name);

    var index = contacts.indexOf(contactFilter);
    console.log("index: " + index);

    // haz el delete
    contacts.splice(index,1);
    console.log(contacts);

    res.send(contacts);

});

// app.listen(port);
// console.log("Server ready");

app.listen(port, hostname, () => {
    console.log(`Server ready is running at http://${hostname}:${port}`);
});