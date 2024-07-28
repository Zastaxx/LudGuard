const { Client, GatewayIntentBits } = require("discord.js");
const { Surveillance } = require("./database");
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
  await Surveillance.sync();
  await initializeChannelDatabase();
});

module.exports = client;
