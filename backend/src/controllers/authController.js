const User = require('../models/User');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const JWT_SECRET = '9ce5891af6c449eca79cde419fd83fe5d7c53fea98c632a0f4fdc61bb715d953'; // Remplacez par votre secret JWT

// Créer un utilisateur
exports.registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();
        res.status(201).json({ message: 'Utilisateur créé avec succès' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};

// Connexion
exports.loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect' });

        // Générer un token JWT
        const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Connexion réussie', token });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};