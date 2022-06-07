const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('buttontest')
        .setDescription('test button'),
    async execute(client) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('primary')
                    .setLabel('primary')
                    .setStyle('PRIMARY'),
            );
        await client.reply({ content: 'Pong!', components: [row] });
    },
};