//const { valorantId } = require('../config.json');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed} = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('split')
        .setDescription('send map file'),
    async execute(client) {
        client.reply({ files: ['./images/valorant/split.JPG'] });
        //client.reply('split!');
        console.log('send split map');

    },
};