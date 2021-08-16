const ms = require('ms');

exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send('<a:852071183762718741:866492730308689950> To start a giveaway `<channel> <how long> <number or winners> <prize>`');
    }

    let giveawayChannel = message.mentions.channels.first();
    if(!giveawayChannel){
        return message.channel.send('<a:852071183762718741:866492730308689950> To start a giveaway `<channel> <how long> <number or winners> <prize>`');
    }

    let giveawayDuration = args[1];
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send('<a:852071183762718741:866492730308689950> To start a giveaway `<channel> <how long> <number or winners> <prize>`');
    }

    let giveawayNumberWinners = args[2];
    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
        return message.channel.send('<a:852071183762718741:866492730308689950> To start a giveaway `<channel> <how long> <number or winners> <prize>`');
    }

    let giveawayPrize = args.slice(3).join(' ');
    if(!giveawayPrize){
        return message.channel.send('<a:852071183762718741:866492730308689950> To start a giveaway `<channel> <how long> <number or winners> <prize>`');
    }

    client.giveawaysManager.start(giveawayChannel, {
        time: ms(giveawayDuration),
        prize: giveawayPrize,
        winnerCount: parseInt(giveawayNumberWinners),
        hostedBy: client.config.hostedBy ? message.author : null,
        // Messages
         embedColor: "#FF0000",
        messages: {
            giveaway: (client.config.everyoneMention ? "@everyone\n\n" : "")+"<a:852071183762718741:866492730308689950> <a:852071183762718741:866492730308689950>  **GIVEAWAY** <a:852071183762718741:866492730308689950> <a:852071183762718741:866492730308689950> ",
            giveawayEnded: (client.config.everyoneMention ? "@everyone\n\n" : "")+"<a:852071183762718741:866492730308689950><a:852071183762718741:866492730308689950>  **GIVEAWAY ENDED** <a:852071183762718741:866492730308689950> <a:852071183762718741:866492730308689950> ",
            timeRemaining: "Time remaining: **{duration}**!",
            inviteToParticipate: "React with 🎉 to participate!",
            winMessage: "Congratulations, {winners}! You won **{prize}**!",
             embedColor: "#FF0000",
            embedFooter: "Giveaways",
            noWinner: "<:733987631628550175:870949748604039189> Giveaway cancelled,no valid participations.<:733987631628550175:870949748604039189>",
            hostedBy: "Hosted by: {user}",
            winners: "winner(s)",
            endedAt: "Ended at",
             embedColor: "#FF0000",
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                pluralS: false 
        }
        }
    });

    message.channel.send(`Giveaway started in ${giveawayChannel}!`);

};