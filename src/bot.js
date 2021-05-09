require('dotenv').config();

const { Client, WebhookClient } = require('discord.js');
const client = new Client({
  partials: ['MESSAGE', 'REACTION'],
});

const webhookClient = new WebhookClient(
  process.env.WEBHOOK_ID,
  process.env.WEBHOOK_TOKEN
);

const PREFIX = '!';

client.on('ready', () => {
  console.log(`The bot has logged in as username: ${client.user.tag}`);
});

client.on('message', async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);
    if (CMD_NAME === 'kick') {
      if (!message.member.hasPermission('KICK_MEMBERS'))
        return message.reply('You cannot kick with your current permissions.');
      if (args.length === 0) return message.reply('Please provide an ID');
      const member = message.guild.members.cache.get(args[0]);
      if (member) {
        member
          .kick()
          .then((member) => message.channel.send(`${member} was kicked.`))
          .catch((err) => message.channel.send('Permission is not granted.'));
      } else {
        message.channel.send('That member was not found');
      }
    } else if (CMD_NAME === 'ban') {
      if (!message.member.hasPermission('BAN_MEMBERS'))
        return message.reply('You cannot ban with your current permissions.');
      if (args.length === 0) return message.reply('Please provide an ID');
      try {
        const user = await message.guild.members.ban(args[0]);
        message.channel.send('User was banned successfully.');
      } catch (err) {
        console.log(err);
        message.channel.send(
          'An error occured. You may not have permissions, or user is not found.'
        );
      }
    } else if (CMD_NAME === 'announce') {
      console.log(args);
      const msg = args.join(' ');
      console.log(msg);
      webhookClient.send(msg);
    }
  }
});

client.on('messageReactionAdd', (reaction, user) => {
  console.log('Hello');
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  if (reaction.message.id === '840379108919083020') {
    switch (name) {
      case '🍎':
        member.roles.add('840376653413744651');
        break;
      case '🍇':
        member.roles.add('840376690630197258');
        break;
    }
  }
});

client.on('messageReactionRemove', (reaction, user) => {
  console.log('Bye');
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  if (reaction.message.id === '840379108919083020') {
    switch (name) {
      case '🍎':
        member.roles.remove('840376653413744651');
        break;
      case '🍇':
        member.roles.remove('840376690630197258');
        break;
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
