const express = require('express');
const { body } = require('express-validator');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

// Créer un utilisateur
router.post('/register', [
    body('name').notEmpty().withMessage('Nom requis'),
    body('email').isEmail().withMessage('Email invalide'),
    body('password').isLength({ min: 6 }).withMessage('Mot de passe doit contenir au moins 6 caractères'),
], registerUser);

// Connexion
router.post('/login', [
    body('email').isEmail().withMessage('Email invalide'),
    body('password').notEmpty().withMessage('Mot de passe requis'),
], loginUser);

module.exports = router;