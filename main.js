const { Client, GatewayIntentBits, ActivityType } = require("discord.js");
const fs = require("fs");
const path = require("path");
const { token } = require("./config.json");
const { initializeDatabase } = require("./database");
const {
  initializeDatabase: initializeChannelDatabase,
} = require("./channelDatabase");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", async () => {
  console.log(`${client.user.tag} est maintenant connecté !`);

  const customStatus = [
    `📜 Surveille les messages 📋`,
    `🔍 Vérification en cours... 🕵️`,
    `🚨 Protection du serveur ⚠️`,
    `📬 Gestion des messages 📊`,
  ];

  setInterval(() => {
    const status =
      customStatus[Math.floor(Math.random() * customStatus.length)];
    client.user.setPresence({
      activities: [{ name: status, type: ActivityType.Custom }],
      status: "online",
    });
  }, 60000);

  try {
    await initializeDatabase();
    await initializeChannelDatabase();
    console.log("Base de données initialisée avec succès.");
  } catch (error) {
    console.error(
      "Erreur lors de l'initialisation de la base de données :",
      error
    );
  }

  client.commands = new Map();
  const commandFiles = fs
    .readdirSync(path.join(__dirname, "commands"))
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(path.join(__dirname, "commands", file));
    client.commands.set(command.data.name, command);
  }

  const eventFiles = fs
    .readdirSync(path.join(__dirname, "events"))
    .filter((file) => file.endsWith(".js"));

  for (const file of eventFiles) {
    const event = require(path.join(__dirname, "events", file));
    if (event.name) {
      console.log(`Enregistrement de l'événement : ${event.name}`);
      client.on(event.name, (...args) => event.execute(...args, client));
    }
  }
});

client.login(token);
