require("dotenv").config()
const express = require("express")
const app = express();

/*
 -------------------------------------------
    Express Server to keep bot online
 -------------------------------------------
*/

app.listen(3000, () => {
console.log("Project is running!");
})

app.get("/", (req, res) => {
res.send("The bot is alive!!. This shows that the bot is up and running.");
})
/*
 -------------------------------------------
    Initialization
 -------------------------------------------
*/

const Discord = require("discord.js")
const { Client, Collection } = require("discord.js");
const client = new Discord.Client({
   intents: 
   [
		"GUILDS",
		"GUILD_PRESENCES",
		"GUILD_MESSAGES",
		"GUILD_MEMBERS"
	]
  });
const fs = require("fs");
/*
 -------------------------------------------
    Handler
 -------------------------------------------
*/
const commandFiles = fs.readdirSync("./Commands").filter(file => file.endsWith(".js"));

const commands = [];

client.commands = new Collection();

for (const file of commandFiles) {
	const command = require(`./Commands/${file}`);
	commands.push(command.data.toJSON());
	client.commands.set(command.data.name, command);
}

const eventFiles = fs
	.readdirSync("./events")
	.filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, commands));
	} else {
		client.on(event.name, (...args) => event.execute(...args, commands));
	}
}
/*
 -------------------------------------------
    Ready Commands
 -------------------------------------------
*/


client.on("ready", async () => {
  console.log("Bot ready")
  console.log(`Logged in as ${client.user.tag}`)
  setInterval((message) => {
  client.user.setActivity(`/help | In 
  ${client.guilds.cache.size} servers!`,{type: "PLAYING"})
  }, 1000);  
})

/*
 -------------------------------------------
    Ratelimit Detector
 -------------------------------------------
*/

client.on('debug', (a)=>{
  if(a.startsWith(`Hit a 429`)){
    process.kill(1)
  }
});

client.on("rateLimit", data => {
  process.kill(1)
})

client.on('rateLimited', () => {
  process.kill(1);
});


/*
 -------------------------------------------
    Logging In to Bot
 -------------------------------------------
*/

/*const { token } = require(`./config.json`)
client.login(token)*/ // When you leave replit uncomment this

client.login(process.env.token)
