const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const { Surveillance } = require("../database");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("listmonitor")
    .setDescription("Affiche la liste des utilisateurs sous surveillance"),

  async execute(interaction) {
    try {
      const surveillances = await Surveillance.findAll();

      if (surveillances.length === 0) {
        await interaction.reply({
          content: "📜 Aucun utilisateur n'est actuellement sous surveillance.",
          ephemeral: true,
        });
      } else {
        const userList = surveillances
          .map((surveillance) => `<@${surveillance.userId}>`)
          .join("\n");

        const embed = new EmbedBuilder()
          .setColor("#FF0000")
          .setTitle("📜 Utilisateurs Sous Surveillance")
          .setDescription(userList)
          .setTimestamp()
          .setFooter({ text: "LudGuard v1.0" });

        await interaction.reply({
          embeds: [embed],
          ephemeral: true,
        });
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des utilisateurs surveillés :",
        error
      );
      await interaction.reply({
        content:
          "❌ Une erreur est survenue lors de la récupération des utilisateurs surveillés.",
        ephemeral: true,
      });
    }
  },
};
