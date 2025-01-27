const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    location: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: String, default: 'En attente' },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Champ pour l'auteur
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);