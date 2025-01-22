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
// Obtenir un signalement par ID
exports.getReportById = async (req, res) => {
    const { id } = req.params;

    try {
        const report = await Report.findById(id);
        if (!report) return res.status(404).json({ message: 'Signalement introuvable' });
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du signalement', error });
    }
};
// Mettre à jour le statut d'un signalement
exports.updateReportStatus = async (req, res) => {
    
    if (req.user.role !== 'authority') {
        return res.status(403).json({ message: 'Accès réservé aux autorités' });
    }

    const { id } = req.params;
    const { status } = req.body;

    if (!['En attente', 'En cours', 'Résolu'].includes(status)) {
        return res.status(400).json({ message: 'Statut invalide' });
    }

    try {
        const report = await Report.findByIdAndUpdate(id, { status }, { new: true });
        if (!report) return res.status(404).json({ message: 'Signalement introuvable' });
        res.json({ message: 'Statut mis à jour', report });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};