const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'Accès refusé. Aucun token fourni.' });
    }
    const token = authHeader.replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, '9ce5891af6c449eca79cde419fd83fe5d7c53fea98c632a0f4fdc61bb715d953'); // Remplacez par votre secret JWT
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: 'Utilisateur non trouvé.' });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Token invalide.' });
    }
};

module.exports = authMiddleware;