var mongoose = require('mongoose');

var storylineSchema = new mongoose.Schema({
    id: { type: String, index: { unique: true }},
    synopsis: { type: String },
    seeAlso: { type: Array }
})

module.exports = storylineSchema
