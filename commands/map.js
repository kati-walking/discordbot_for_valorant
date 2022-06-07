const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { default: axios } = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('map')
        .setDescription('display map'),
    async execute(client) {
        const mapname = await getData();
        const list = [];
        console.log(mapname);
        mapname.forEach(element => {
            if(element.displayIcon === null){ return; }
            list.push({
                label:`${element.displayName}`,
                //description:`${element}`,
                id:`${element.uuid}`,
                img_url:`${element.displayIcon}`,
                value:`${element.uuid}`,
            });
        });

        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('select')
                    .setPlaceholder('Nothing Selected')
                    .addOptions(list),
            );
        await client.reply({ content: 'select_map', components: [row] });
    },
};
async function getData(){
    const apidata = await axios.get('https://valorant-api.com/v1/maps');
    //if(apidata)console.log(`func:${apidata}`);
    return apidata.data.data;
}
async function getId(){
    const data = await getData();
    const list = new Map();
    await data.forEach(element => {
         list.set(element.displayName, element.uuid);
    });
    //console.log(list);
    return list;
}
async function getMapName(){
    const data = await getData();
    const list = [];
    await data.forEach(element => {
        list.push(element.displayName);
    });
    //console.log(list);
    return list;
}
async function getMapData(name){
    //console.log(toString.call(await getId()));
    const data = await getId();
    //console.log(data);
    const id = data.get(name);
    const apidata = await axios.get(`https://valorant-api.com/v1/maps/${id}`);
    return(apidata.data.data);
}

async function getMapURL(name){
    const data = await getMapData(name);
    return data.displayIcon;
}