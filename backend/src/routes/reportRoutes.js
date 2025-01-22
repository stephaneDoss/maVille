const express = require('express');
const multer = require('multer');
const { createReport, getAllReports,updateReportStatus,getReportById } = require('../controllers/reportController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Configuration de multer pour gérer les fichiers
const upload = multer({ dest: 'uploads/' });

router.post('/reports', upload.single('image'), createReport);
router.get('/reports', authMiddleware, getAllReports);
router.get('/reports/:id', authMiddleware, getReportById); // Nouvelle route pour obtenir un signalement par ID

router.patch('/reports/:id/status', authMiddleware, updateReportStatus);


module.exports = router;