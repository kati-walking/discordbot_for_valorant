const { Client, Collection, Intents, Interaction } = require('discord.js');
const { token } = require('./config.json');
const { guildId } = require('./config.json');
const { scheduleId } = require('./config.json');
//const { generalId } = require('./config.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] });
const cron = require('node-cron');

const fs = require('node:fs');
const path = require('node:path');

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if(event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

cron.schedule('0 8 * * *', () => {
    console.log('schedule happen!');
    client.channels.cache.get(scheduleId).send('scedule happen!');
});

client.on('guildMemberAdd', member => {
    if (member.guild.id !== guildId) return;
    // 指定のサーバー以外では動作しないようにする
    member.guild.channels.cache.get(guildId).send(`${member.user}が参加しました！`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});


client.login(token);
console.log('login');