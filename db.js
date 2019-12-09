var DataStore = require('nedb');
var DB_FILE_NAME = __dirname + "/contacts.json";

var db = new DataStore({
    filename : DB_FILE_NAME,
    //filename : "/workspace/contacts.json",
    autoload: true
});

module.exports = db;