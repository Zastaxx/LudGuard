const { SlashCommandBuilder } = require("@discordjs/builders");
const { Channel } = require("../channelDatabase");
const { checkPermissions } = require("../checkPermissions");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setmodchannel")
    .setDescription("Définit le canal de modération.")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Le canal de modération")
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

    const channel = interaction.options.getChannel("channel");

    try {
      const [channelRecord, created] = await Channel.findOrCreate({
        where: {},
        defaults: { modChannelId: channel.id },
      });

      if (!created) {
        channelRecord.modChannelId = channel.id;
        await channelRecord.save();
      }

      await interaction.reply({
        content: `🔧 Le canal de modération a été défini sur ${channel} 🛠️.`,
        ephemeral: true,
      });
    } catch (error) {
      console.error(
        "Erreur lors de l'installation du canal de surveillance :",
        error
      );
      await interaction.reply({
        content:
          "❌ Une erreur s'est produite lors de la définition du canal de modération.",
        ephemeral: true,
      });
    }
  },
};
