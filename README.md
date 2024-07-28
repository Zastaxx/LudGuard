# 🎮 LudBot - Bot Discord de Surveillance et Modération

![LudBot Logo](https://img.shields.io/badge/LudBot-%E2%9C%94-brightgreen) ![Node.js Version](https://img.shields.io/badge/Node.js-%3E%3D%2016.0-blue) ![Discord.js Version](https://img.shields.io/badge/discord.js-%3E%3D%2013.0-blue)

LudBot est un bot Discord conçu pour faciliter la surveillance et la gestion des canaux de modération sur votre serveur. Grâce à des commandes personnalisées, vous pouvez surveiller des utilisateurs, définir des canaux de modération, et plus encore !

## 🚀 Fonctionnalités

- 📜 **Surveillance des Utilisateurs** : Ajoutez ou retirez des utilisateurs de la surveillance avec des commandes simples.
- 🔍 **Définition du Canal de Modération** : Configurez un canal spécifique pour recevoir des alertes de modération.
- ⚙️ **Gestion des Permissions** : Assurez-vous que seules les personnes autorisées peuvent utiliser les commandes.

## 🛠️ Prérequis

- [Node.js](https://nodejs.org/) (Version 16.0 ou supérieure)
- [npm](https://www.npmjs.com/) (ou [yarn](https://yarnpkg.com/))

## 🔧 Installation

1. **Cloner le Dépôt**

   ```bash
   git clone https://github.com/yourusername/LudBot.git

2. **Accéder au Répertoire du Projet**
    ```bash
    cd LudBot

3. **Installer les Dépendances**
     ```bash
    npm install

4. **Configurer le Bot**
     ```json
    {
    "token": "token",
    "clientId": "clien_id_bot",
    "guildId": "discord_id",
    "database": "./database.sqlite"
    }

5. **Initialliser & Démarrer le Bot**
     ```bash
     node deploy-commands.js
     node main.js

## ⚙️ Configuration des Permissions
Pour restreindre l'accès aux commandes uniquement à certains groupes, modifiez le fichier checkPermissions.js pour inclure les IDs des groupes autorisés.

    const allowedRoleIds = [
    "419551212560449547", // QUEEN
    "419554086023593984", // ADMIN
    "419552824393990155", // MODO
    ];
  
    const checkPermissions = (interaction) => {
      const memberRoles = interaction.member.roles.cache;
      return allowedRoleIds.some((roleId) => memberRoles.has(roleId));
    };
    
    module.exports = { checkPermissions };

## 📜 Commandes Disponibles

- /monitor [user] : Ajoute un utilisateur à la surveillance.
- /unmonitor [user] : Retire un utilisateur de la surveillance.
- /setmodchannel [channel] : Définit le canal de modération.
- /removemodchannel : Supprime le canal de modération actuellement défini.
