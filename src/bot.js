require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client();

client.on('ready', () => {
  console.log(
    `The bot has logged in as username: ${client.user.username} - ${client.user.tag}`
  );
});

client.on('message', (message) => {
  if (message.author.bot) return;
  if (message.content === 'hello') {
    message.channel.send('hello');
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
