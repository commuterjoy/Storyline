var mongoose = require('mongoose');

var storylineSchema = new mongoose.Schema({
    id: { type: String, index: { unique: true }},
    synopsis: { type: String },
    slots: { type: Array },
    seeAlso: { type: Array }
})

module.exports = storylineSchema
