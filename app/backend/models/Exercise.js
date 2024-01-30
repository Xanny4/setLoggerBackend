const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const exerciseSchema = new Schema({
    name: { type: String, required: true },
    imageURL: { type: String, required: true }
});

const Exercise = model('Exercise', exerciseSchema);
module.exports = Exercise;