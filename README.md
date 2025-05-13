# 🎮 Gamerz

**Gamerz** est une plateforme sécurisée et ergonomique permettant aux joueurs de se retrouver dans des salons de discussion dédiés à leurs jeux favoris. L'objectif est de faciliter la découverte de partenaires de jeu afin qu'ils puissent rapidement trouver quelqu'un avec qui jouer.

## 🚀 Fonctionnalités principales

* Authentification sécurisée (inscription, connexion, déconnexion)
* Création et gestion de salons de discussion par jeu
* Messagerie en temps réel entre joueurs
* Interface utilisateur réactive et intuitive

## 🛠️ Stack technologique

### Front-end

* React.js avec TypeScript
* React Hook Form pour la gestion des formulaires
* Zod pour la validation des données
* React Router pour la navigation

### Back-end

* Express.js
* JWT pour l'authentification
* bcrypt pour le hachage des mots de passe
* Cookies httpOnly pour la sécurité
* Socket.io pour la communication en temps réel

### Base de données

* MongoDB

## 📁 Structure du projet

```
Gamerz-ML-JN/
├── client/         # Code source du front-end
│   └── ...
├── server/         # Code source du back-end
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── ...
│   └── ...
├── .gitignore
├── README.md
└── ...
```

## 🔧 Installation et exécution

### Prérequis

* Node.js (version 14 ou supérieure)
* npm ou yarn
* MongoDB

### Étapes

1. Cloner le dépôt :

   ```bash
   git clone https://github.com/2024-devops-alt-dist/Gamerz-ML-JN.git
   cd Gamerz-ML-JN
   ```

2. Installer les dépendances du serveur :

   ```bash
   cd server
   npm install
   ```

3. Configurer les variables d'environnement :
   Créer un fichier `.env` dans le dossier `server` avec les variables suivantes :

   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Démarrer le serveur :

   ```bash
   npm run dev
   ```

5. Installer les dépendances du client :

   ```bash
   cd ../client
   npm install
   ```

6. Démarrer le client :

   ```bash
   npm run dev
   ```

## 🧪 Tests API avec IntelliJ IDEA

Le dossier `server/http/` contient des fichiers `.http` pour tester les endpoints de l'API.

### Utilisation

1. Ouvrir les fichiers `.http` dans IntelliJ IDEA.
2. Cliquer sur le bouton vert "Exécuter" à côté de chaque requête.
3. Voir la réponse dans le panneau de droite.

### Endpoints disponibles

* **Auth**

  * `auth/register.http` : Inscription d'un nouvel utilisateur
  * `auth/login.http` : Connexion d'un utilisateur
  * `auth/logout.http` : Déconnexion d'un utilisateur
* **User**

  * `user/delete-user.http` : Suppression d'un utilisateur par ID

## 🤝 Contribuer

1. Forker le projet.
2. Créer une branche pour votre fonctionnalité : `git checkout -b feature/ma-fonctionnalite`.
3. Commiter vos modifications : `git commit -m 'Ajout de ma fonctionnalité'`.
4. Pusher la branche : `git push origin feature/ma-fonctionnalite`.
5. Ouvrir une Pull Request.

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus d'informations.