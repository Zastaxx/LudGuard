const { SlashCommandBuilder } = require("@discordjs/builders");
const { Surveillance } = require("../database");
const { checkPermissions } = require("../checkPermissions");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("monitor")
    .setDescription("Ajoute un utilisateur à la surveillance.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("L'utilisateur à surveiller")
        .setRequired(true)
    ),

  async execute(interaction) {
    if (!checkPermissions(interaction)) {
      await interaction.reply({
        content: "❌ Vous n'avez pas la permission d'utiliser cette commande.",
        ephemeral: true,
      });
      return;
    }

    const user = interaction.options.getUser("target");

    try {
      await Surveillance.create({ userId: user.id });
      await interaction.reply({
        content: `🎯 **<@${user.id}>** est maintenant sous surveillance.`,
        ephemeral: false,
      });
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        await interaction.reply({
          content: `⚠️ **${user.tag}** est déjà sous surveillance.`,
          ephemeral: true,
        });
      } else {
        console.error("Erreur lors de l'ajout à la surveillance :", error);
        await interaction.reply({
          content:
            "❌ Une erreur est survenue lors de l'ajout à la surveillance.",
          ephemeral: true,
        });
      }
    }
  },
};
