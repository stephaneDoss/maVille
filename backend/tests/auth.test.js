const request = require('supertest');
const app = require('../src/app'); // Importez l'app Express
const mongoose = require('mongoose');
const User = require('../src/models/User');
const bcrypt = require('bcrypt');

describe('Tests des routes d\'authentification', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    afterEach(async () => {
        await User.deleteMany({});
    });

    test('Inscription réussie', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Test User',
                email: 'test@example.com',
                password: 'testpassword',
                role: 'citizen'
            });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('Utilisateur créé avec succès');
    });

    test('Connexion réussie', async () => {
        // Créer un utilisateur en base
        const hashedPassword = await bcrypt.hash('testpassword', 10);
        await User.create({
            name: 'Test User',
            email: 'test@example.com',
            password: hashedPassword,
            role: 'citizen'
        });

        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'testpassword'
            });
        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
    });

test('Accès non autorisé sans token', async () => {
    const res = await request(app)
        .get('/api/reports'); 
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Accès non autorisé');
});

});
