# maVille

maVille est une application permettant aux citoyens de signaler des problèmes dans leur ville et aux autorités locales de gérer ces signalements.

## Prérequis

- Node.js (version 14 ou supérieure)
- npm (version 6 ou supérieure)
- MongoDB

## Installation

1. Clonez le dépôt :
   ```sh
   git clone https://github.com/votre-utilisateur/votre-projet.git
   cd votre-projet ```
2. Installez les dépendances :
    npm install
3. Configurez les variables d'environnement :
    Créez un fichier .env à la racine du projet/backend.
    Ajoutez les variables d'environnement suivantes :
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=your_email_password

## Lancement du projet

1. Démarrez le serveur :
    npm start
2. Accédez à l'application :

    Ouvrez votre navigateur et accédez à http://localhost:5000.

## Fonctionnalités
    Citoyen
    Créer un compte :

    Accédez à la page d'inscription.
    Remplissez les champs requis (nom, email, mot de passe).
    Cliquez sur "S'inscrire".
    Se connecter :

    Accédez à la page de connexion.
    Entrez votre email et votre mot de passe.
    Cliquez sur "Se connecter".
    Créer un signalement :

    Après vous être connecté, accédez à la page de création de signalement.
    Remplissez les champs requis (titre, catégorie, description, localisation, image, latitude, longitude).
    Cliquez sur "Soumettre".
    Voir vos signalements :

    Accédez à la page de vos signalements pour voir la liste de vos signalements.
    Voir les détails d'un signalement :

    Cliquez sur un signalement pour voir les détails.
    Autorité
    Se connecter :
    Accédez à la page de connexion.
    Entrez votre email et votre mot de passe.
    Cliquez sur "Se connecter".