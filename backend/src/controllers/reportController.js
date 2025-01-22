const Report = require('../models/Report');

// Créer un signalement
exports.createReport = async (req, res) => {
    try {
        const newReport = new Report({
            title: req.body.title,
            category: req.body.category,
            description: req.body.description,
            image: req.file ? req.file.path : '',
            location: req.body.location,
        });
        await newReport.save();
        res.status(201).json({ message: 'Signalement créé avec succès', report: newReport });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du signalement', error });
    }
};

// Obtenir tous les signalements
exports.getAllReports = async (req, res) => {
    try {
        const reports = await Report.find();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des signalements', error });
    }
};