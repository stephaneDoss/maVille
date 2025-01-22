const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const reportRoutes = require('./routes/reportRoutes');
require('dotenv').config();

const app = express();

// Connexion à la base de données
connectDB();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use('/api', reportRoutes);

module.exports = app;