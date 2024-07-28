const { EmbedBuilder } = require("discord.js");
const { Surveillance } = require("../database");
const { Channel } = require("../channelDatabase");

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    if (message.author.bot) return;

    try {
      const surveillance = await Surveillance.findOne({
        where: { userId: message.author.id },
      });

      if (surveillance) {
        const channelRecord = await Channel.findOne();

        if (channelRecord && channelRecord.modChannelId) {
          const modChannel = message.guild.channels.cache.get(
            channelRecord.modChannelId
          );

          if (modChannel) {
            const embed = new EmbedBuilder()
              .setColor("#00861f")
              .setTitle("🔍 Nouveau message d'un utilisateur sous surveillance")
              .addFields([
                {
                  name: "Utilisateur :",
                  value: `<@${message.author.id}> (${message.author.id})`,
                  inline: true,
                },
                {
                  name: "Date du message :",
                  value: `<t:${Math.floor(message.createdTimestamp / 1000)}:F>`,
                  inline: true,
                },
                {
                  name: "Canal :",
                  value: `<#${message.channel.id}>`,
                  inline: true,
                },
                {
                  name: "Lien vers le message :",
                  value: `[Voir le message](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`,
                },
                { name: "Message :", value: message.content },
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
      console.error("Erreur lors de la gestion du message :", error);
    }
  },
};
