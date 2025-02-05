
const mongoose = require('mongoose');

const DisorderSchema = new mongoose.Schema({
    disorder_name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    common_treatments: { type: String },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Disorder', DisorderSchema);