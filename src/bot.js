require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client();

client.on('ready', () => {
  console.log('The bot has logged in as username: ', `${client.user.username}`);
});

client.login(process.env.DISCORD_BOT_TOKEN);
