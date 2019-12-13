const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name : String,
    phone: Number
});

// creo un metodo cleanup en mi schema de contacto para que me aparezca solo los atributos que yo quiera, si no lo tuviera
// e hiciera un get sobre el schema contacts me devolveria tambien el id junto con el name y phone
contactSchema.methods.cleanup = function(){
    return {name: this.name, phone: this.phone};
}

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;