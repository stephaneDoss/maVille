const express = require('express');
const multer = require('multer');
const { createReport, getAllReports } = require('../controllers/reportController');

const router = express.Router();

// Configuration de multer pour gérer les fichiers
const upload = multer({ dest: 'uploads/' });

router.post('/reports', upload.single('image'), createReport);
router.get('/reports', getAllReports);

module.exports = router;