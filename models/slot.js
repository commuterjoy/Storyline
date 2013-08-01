var mongoose = require('mongoose');

var slotSchema = new mongoose.Schema({
    time: { type: Date },
    storyline: { type: String } 
})

module.exports = slotSchema;
