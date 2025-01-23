const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    location: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: String, default: 'En attente' },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Nouveau champ pour l'auteur
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);