const express = require('express');
const multer = require('multer');
const { createReport, getAllReports, updateReportStatus, getReportById, getReportStatistics } = require('../controllers/reportController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Configuration de multer pour gérer les fichiers
const upload = multer({ dest: 'uploads/' });

/**
 * @swagger
 * /reports:
 *   post:
 *     summary: Créer un signalement
 *     tags: [Reports]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               email:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Signalement créé avec succès
 *       400:
 *         description: Catégorie invalide
 *       401:
 *         description: Utilisateur non authentifié
 *       500:
 *         description: Erreur lors de la création du signalement
 */
router.post('/reports', authMiddleware, upload.single('image'), createReport);

/**
 * @swagger
 * /reports:
 *   get:
 *     summary: Obtenir tous les signalements
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Liste de tous les signalements
 *       401:
 *         description: Utilisateur non authentifié
 *       500:
 *         description: Erreur lors de la récupération des signalements
 */
router.get('/reports', authMiddleware, getAllReports);

/**
 * @swagger
 * /reports/statistics:
 *   get:
 *     summary: Obtenir les statistiques des signalements
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Statistiques des signalements
 *       401:
 *         description: Utilisateur non authentifié
 *       403:
 *         description: Accès refusé
 *       500:
 *         description: Erreur lors de la récupération des statistiques
 */
router.get('/reports/statistics', authMiddleware, getReportStatistics);

/**
 * @swagger
 * /reports/{id}:
 *   get:
 *     summary: Obtenir un signalement par ID
 *     tags: [Reports]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du signalement
 *     responses:
 *       200:
 *         description: Détails du signalement
 *       401:
 *         description: Utilisateur non authentifié
 *       403:
 *         description: Accès refusé
 *       404:
 *         description: Signalement introuvable
 *       500:
 *         description: Erreur lors de la récupération du signalement
 */
router.get('/reports/:id', authMiddleware, getReportById);

/**
 * @swagger
 * /reports/{id}/status:
 *   patch:
 *     summary: Mettre à jour le statut d'un signalement
 *     tags: [Reports]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du signalement
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Statut mis à jour
 *       400:
 *         description: Statut invalide
 *       401:
 *         description: Utilisateur non authentifié
 *       403:
 *         description: Accès refusé
 *       404:
 *         description: Signalement introuvable
 *       500:
 *         description: Erreur lors de la mise à jour du statut
 */
router.patch('/reports/:id/status', authMiddleware, updateReportStatus);

module.exports = router;