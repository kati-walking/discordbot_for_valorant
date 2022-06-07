const { default: axios } = require('axios');
module.exports = {
    name: 'selectmenu',
    async execute(interaction) {
        console.log(interaction);
        if(!interaction.isSelectMenu()){
            console.log('not select menu');
            return;
        }
    },
};
