module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
      console.log(`Commande inconnue : ${interaction.commandName}`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(
        `Erreur lors de l'exécution de la commande : ${interaction.commandName}`,
        error
      );
      await interaction.reply({
        content: `Une erreur s'est produite lors de l'exécution de cette commande !`,
        ephemeral: true,
      });
    }
  },
};
