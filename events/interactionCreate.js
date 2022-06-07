const { default: axios } = require('axios');
module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered`);
        console.log('interaction reply');
        if(interaction.isSelectMenu()) {
            console.log('select menu');
            console.log(interaction);
            const data = await getMapData(interaction.values);
            console.log(data);
            interaction.reply({ files: [`${data.displayIcon}`] });
        }
    },
};

async function getMapData(id){
    const apidata = await axios.get(`https://valorant-api.com/v1/maps/${id}`);
    return(apidata.data.data);
}