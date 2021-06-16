const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

const config = require("./config.json");
const data = JSON.parse(fs.readFileSync("./data.json"));

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("message", (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;

  const commandBody = message.content.slice(config.prefix.length);
  const args = commandBody.split(" ");
  const command = args.shift();

  if (command === "help")
    return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle("Help")
        .setDescription(
          `**Commands**\n${config.prefix}dare - request a dare prompt\n${config.prefix}truth - request a truth prompt\n\n[Invite](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)`
        )
    );

  if (command === "dare") {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle("Dare")
        .setDescription(
          data.dares[Math.floor(Math.random() * data.dares.length)]
        )
        .setColor("#85144b")
        .setFooter(
          `Requested by: ${message.author.tag}`,
          message.author.displayAvatarURL()
        )
    );
  }

  if (command === "truth") {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle("Truth")
        .setDescription(
          data.truths[Math.floor(Math.random() * data.truths.length)]
        )
        .setColor("#01FF70")
        .setFooter(
          `Requested by: ${message.author.tag}`,
          message.author.displayAvatarURL()
        )
    );
  }
});

client.login(config.token);
