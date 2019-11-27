var express = require('express');
var bodyParser = require('body-parser');

var port = 3000;
var BASE_API_PATH = "/api/v1";

console.log("Starting API server...");

var app = express();
app.use(bodyParser.json());

app.get("/",(req, res) => {
    res.send("<html><body><h1>My server in docker local JD</h1></body></html>");
});

// creamos una variable temporal contacts con los contactos de prueba
var contacts = [ 
    {"id": 1, "name" : "peter", "phone": 12345 }, 
    {"id": 2, "name" : "john", "phone": 6789} 
];

// metodo GET usando variable temporal
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
})

app.listen(port);

console.log("Server ready");