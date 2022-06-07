const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('selectmenutest')
        .setDescription('test select map'),
    async execute(client) {
        const row = new MessageActionRow();
        const menu = new MessageSelectMenu()
                .setCustomId('select')
                .setPlaceholder('Nothing Selected')
                .addOptions([
                    {
                        label:'select me',
                        description:'this is a description',
                        value:'first',
                    },
                    {
                        label: 'You can select me too',
                        description: 'This is also a description',
                        value: 'second',
                    },
                ]);
        row.addComponents(menu);

        await client.reply({ content: 'Pong!', components: [row] });
    },
};
