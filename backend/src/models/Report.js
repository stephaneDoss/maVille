const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    location: { type: String, required: true },
    status: { type: String, default: 'En attente' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Report', ReportSchema);