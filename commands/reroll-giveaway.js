const ms = require('ms');

exports.run = async (client, message, args) => {


    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send('<:733987631628550175:870949748604039189>  to reroll put the `<message id>`');
    }

    if(!args[0]){
        return message.channel.send('<:733987631628550175:870949748604039189>  to reroll put the `<message id>`');
    }

    let giveaway = 
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ') && g.guildID === message.guild.id) ||
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0] && g.guildID === message.guild.id);

    if(!giveaway){
        return message.channel.send('<:733987631628550175:870949748604039189> Unable to find a giveaway for `'+ args.join(' ') +'`.');
    }

    client.giveawaysManager.reroll(giveaway.messageID)
    .then(() => {
        message.channel.send('<:733988422405980211:868915509939273799> Giveaway rerolled!');
    })
    .catch((e) => {
        if(e.startsWith(`<:733987631628550175:870949748604039189> Giveaway with message ID ${giveaway.messageID} is not ended.`)){
            message.channel.send('<:733987631628550175:870949748604039189> This giveaway is not ended!');
        } else {
            console.error(e);
            message.channel.send('<:733987631628550175:870949748604039189> An error occur- the giveaway has not ended');
        }
    });

};