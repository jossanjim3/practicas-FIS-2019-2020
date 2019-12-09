const app = require('./server.js');

// var port = 3000; // esto para trabajar en localhost esta bien pero para desplegar en heroku no
var port = (process.env.PORT || 3000); // leemos de la variable de entorno port, y si no hay valor elegimos 3000 por defecto.

console.log("Starting API server...");

app.listen(port);

console.log("Server ready");