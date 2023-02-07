const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("echo")
    .setDescription("Echo a message into a channel.")
    .addStringOption(option =>
      option.setName('text')
        .setDescription("Text to echo.")
        .setRequired(true))
    .addChannelOption(option =>
      option.setName('channel')
        .setDescription("Channel to send the message in.")
        .setRequired(false)),
  async execute(interaction) {
    const channel = interaction.options.getChannel("channel");
    const text = interaction.options.get("text").value;
    if (!channel) {
      interaction.channel.send(`${text}`);
      interaction.reply({content: "Message Sent!", ephemeral: true})
    } else {
      try {
        channel.send(`${text}`)
        interaction.reply({content: "Message Sent!", ephemeral: true})
      } catch (e) {
        console.log(e);
        interaction.reply({ content: e, ephemeral: true })
      }
    }
  },
}
