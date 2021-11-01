const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://diwali:diwali@diwaliwish.in15p.mongodb.net/diwaliwish?retryWrites=true&w=majority')



const Schema = mongoose.Schema

const diwaliSchema = new Schema({

    name: String,
    wname: String,
    email: String,

});

var Diwalidata = mongoose.model('diwalidata', diwaliSchema);

module.exports = Diwalidata;