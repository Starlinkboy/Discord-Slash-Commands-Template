const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
    .setDescription("Gets the bot's ping and uptime."),
        async execute(interaction) {
          const client=interaction.client;
 
  const row = new Discord.MessageActionRow()
  .addComponents(
      new Discord.MessageButton() 
          .setURL('https://Statuspagelink.com')
          .setLabel('Status')
          .setStyle('LINK'),
  )

  let totalSeconds = (client.uptime / 1000);
let days = Math.floor(totalSeconds / 86400);
totalSeconds %= 86400;
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
let seconds = Math.floor(totalSeconds % 60);

  const embed = new Discord.MessageEmbed()
 .setTitle("Bot Ping")
 .setDescription(`Pong! Latency is ${Date.now() - interaction.createdTimestamp}ms. Bot Latency is ${client.ws.ping}ms\n\n**Uptime:** ${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`,)
 .setColor("GREEN")
 .setFooter("Check out Status Below!")
 await interaction.reply( { embeds : [embed], components: [row]} )

  },
}
