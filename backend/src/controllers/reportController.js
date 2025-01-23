const Report = require('../models/Report');
const transporter = require('../config/mailer');

// Créer un signalement
exports.createReport = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Utilisateur non authentifié.' });
    }

    try {
        const newReport = new Report({
            title: req.body.title,
            category: req.body.category,
            description: req.body.description,
            image: req.file ? req.file.path : '',
            location: req.body.location,
            email: req.user.email,
            author: req.user._id // Associer l'auteur au signalement
        });
        await newReport.save();

        // Envoyer un email de confirmation
        const mailOptions = {
            from: 'votre_email@gmail.com',
            to: newReport.email,
            subject: 'Confirmation de signalement',
            text: `Votre signalement a été créé avec succès. Titre: ${newReport.title}`
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email envoyé: ' + info.response);
            }
        });

        res.status(201).json({ message: 'Signalement créé avec succès', report: newReport });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du signalement', error });
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

        // Envoyer un email de mise à jour de statut
        const mailOptions = {
            from: 'stephmoro23@gmail.com',
            to: report.email,
            subject: 'Mise à jour du statut de votre signalement',
            text: `Le statut de votre signalement a été mis à jour: ${status}`
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email envoyé: ' + info.response);
            }
        });

        res.json({ message: 'Statut mis à jour', report });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};

// Obtenir un signalement par ID
exports.getReportById = async (req, res) => {
    const { id } = req.params;

    try {
        const report = await Report.findById(id).populate('author', 'name email'); // Populate pour obtenir les détails de l'auteur
        if (!report) return res.status(404).json({ message: 'Signalement introuvable' });
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du signalement', error });
    }
};
// Obtenir tous les signalements
exports.getAllReports = async (req, res) => {
    try {
        let reports;
        if (req.user.role === 'authority') {
            // Si l'utilisateur est une autorité, afficher tous les signalements
            reports = await Report.find().populate('author', 'name email');
        } else {
            // Si l'utilisateur est un citoyen, afficher uniquement ses propres signalements
            reports = await Report.find({ author: req.user._id }).populate('author', 'name email');
        }
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des signalements', error });
    }
};
// Obtenir un signalement par ID
// exports.getReportById = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const report = await Report.findById(id);
//         if (!report) return res.status(404).json({ message: 'Signalement introuvable' });
//         res.status(200).json(report);
//     } catch (error) {
//         res.status(500).json({ message: 'Erreur lors de la récupération du signalement', error });
//     }
// };
// Mettre à jour le statut d'un signalement
// exports.updateReportStatus = async (req, res) => {
    
//     if (req.user.role !== 'authority') {
//         return res.status(403).json({ message: 'Accès réservé aux autorités' });
//     }

//     const { id } = req.params;
//     const { status } = req.body;

//     if (!['En attente', 'En cours', 'Résolu'].includes(status)) {
//         return res.status(400).json({ message: 'Statut invalide' });
//     }

//     try {
//         const report = await Report.findByIdAndUpdate(id, { status }, { new: true });
//         if (!report) return res.status(404).json({ message: 'Signalement introuvable' });
//         res.json({ message: 'Statut mis à jour', report });
//     } catch (err) {
//         res.status(500).json({ message: 'Erreur serveur', error: err.message });
//     }
// };