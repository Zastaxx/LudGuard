const { SlashCommandBuilder } = require("@discordjs/builders");
const { Surveillance } = require("../database");
const { checkPermissions } = require("../checkPermissions");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unmonitor")
    .setDescription("Retire un utilisateur de la surveillance.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("L'utilisateur à ne plus surveiller")
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
      const surveillance = await Surveillance.findOne({
        where: { userId: user.id },
      });

      if (surveillance) {
        await surveillance.destroy();
        await interaction.reply({
          content: `✅ **<@${user.id}>** n'est plus sous surveillance.`,
          ephemeral: false,
        });
      } else {
        await interaction.reply({
          content: `❌ **${user.tag}** n'était pas sous surveillance.`,
          ephemeral: true,
        });
      }
    } catch (error) {
      console.error(
        "Erreur lors de la suppression de la surveillance :",
        error
      );
      await interaction.reply({
        content:
          "❌ Une erreur est survenue lors de la suppression de la surveillance.",
        ephemeral: true,
      });
    }
  },
};
