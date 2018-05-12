var Discord = require("discord.io");
var logger  = require("winston");
var auth    = require("./auth.json");

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = "debug";

var discord_bot = new Discord.Client({
    token: auth.token,
    autorun: true
});

discord_bot.on("ready", function(event) {
    logger.info("Connection Established");
    logger.info("Running as: ");
    logger.info(discord_bot.username + ' Client ID: ' + discord_bot.id);
});

discord_bot.on("message", function(user, userID, channelID, message, event) {
    //Look for commands starting with '!'
    if (message[0] == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        args = args.splice(1);
        
        switch(cmd) {
            case 'test':
                discord_bot.sendMessage({
                    to: channelID,
                    message: "test"
                });
                break;
            //more commands
        }
    }
});
