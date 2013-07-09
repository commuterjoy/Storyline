var mongoose = require('mongoose');

var storylineSchema = new mongoose.Schema({
    id: { type: String, index: { unique: true }}
})

module.exports = storylineSchema
