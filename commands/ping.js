const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Vérifie la réactivité du bot."),
  async execute(interaction) {
    const sent = await interaction.reply({
      content: "Pong!",
      fetchReply: true,
    });
    interaction.editReply(
      `Pong! Latence du bot : ${
        sent.createdTimestamp - interaction.createdTimestamp
      }ms. Latence de l'API : ${Math.round(interaction.client.ws.ping)}ms.`
    );
  },
};
