const { EmbedBuilder } = require("discord.js");
const { Surveillance } = require("../database");
const { Channel } = require("../channelDatabase");

module.exports = {
  name: "messageUpdate",
  async execute(oldMessage, newMessage) {
    if (oldMessage.author.bot) return;

    try {
      const surveillance = await Surveillance.findOne({
        where: { userId: oldMessage.author.id },
      });

      if (surveillance) {
        const channelRecord = await Channel.findOne();
        if (channelRecord && channelRecord.modChannelId) {
          const modChannel = oldMessage.guild.channels.cache.get(
            channelRecord.modChannelId
          );
          if (modChannel) {
            const embed = new EmbedBuilder()
              .setColor("#ffcc00")
              .setTitle("✏️ Message modifié d'un utilisateur sous surveillance")
              .addFields([
                {
                  name: "Utilisateur :",
                  value: `<@${oldMessage.author.id}> (${oldMessage.author.id})`,
                  inline: true,
                },
                {
                  name: "Date de modification :",
                  value: `<t:${Math.floor(
                    newMessage.editedTimestamp / 1000
                  )}:F>`,
                  inline: true,
                },
                {
                  name: "Canal :",
                  value: `<#${oldMessage.channel.id}>`,
                  inline: true,
                },
                {
                  name: "Lien vers le message :",
                  value: `[Voir le message](https://discord.com/channels/${oldMessage.guild.id}/${oldMessage.channel.id}/${oldMessage.id})`,
                },
                { name: "Ancien message :", value: oldMessage.content },
                { name: "Nouveau message :", value: newMessage.content },
              ])
              .setTimestamp()
              .setFooter({ text: "LudGuard v1.0" });

            await modChannel.send({ embeds: [embed] });
          } else {
            console.error("Le canal de modération est introuvable.");
          }
        }
      }
    } catch (error) {
      console.error(
        "Erreur lors de la gestion de la modification du message :",
        error
      );
    }
  },
};
