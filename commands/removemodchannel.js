const { SlashCommandBuilder } = require("@discordjs/builders");
const { Channel } = require("../channelDatabase");
const { checkPermissions } = require("../checkPermissions");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("removemodchannel")
    .setDescription("Supprime le canal de modération actuellement défini."),
  async execute(interaction) {
    if (!checkPermissions(interaction)) {
      await interaction.reply({
        content: "❌ Vous n'avez pas la permission d'utiliser cette commande.",
        ephemeral: true,
      });
      return;
    }

    try {
      const existingChannel = await Channel.findOne();

      if (existingChannel) {
        await existingChannel.destroy();
        await interaction.reply("✅ Le canal de surveillance a été supprimé.");
      } else {
        await interaction.reply("❌ Aucun canal de surveillance n'est défini.");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la suppression du canal de surveillance :",
        error
      );
      await interaction.reply(
        "❌ Une erreur est survenue lors de la suppression du canal de surveillance."
      );
    }
  },
};
