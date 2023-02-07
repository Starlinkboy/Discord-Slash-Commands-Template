const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("Command Name")
    .setDescription("Command Description")
    //text option
    .addStringOption(option =>
      option.setName('option1')
        .setDescription("option1 description")
        .setRequired(true)) // required option
    //Channel option
    .addChannelOption(option =>
      option.setName('channel option1')
        .setDescription("Channel option1 description")
        .setRequired(false)),//not required option
  async execute(interaction) {
    //getting the channel mentioned in channel option
    const channel = interaction.options.getChannel("channel");
    //getting the text given in text option
    const text = interaction.options.get("text").value;
   
  },
}
