var Discord = require("discord.io");
var logger  = require("winston");
var auth    = require("./auth.json");
var helpers = require("./src/helpers.js")

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
            case 'roll':
                let regex = RegExp("\\d+d\\d+");
                var roll = args[0].toLowerCase();

                if (!regex.test(roll)) {
                    discord_bot.sendMessage({
                        to: channelID,
                        message: "Incorrect syntax! Correct usage: xdy where" +
                        " x is the number of rolls and y is the number of sides." 
                    });
                    break;
                }

                var dpos = roll.search('d') + 1;
                var rolls = parseInt(roll.substring(roll, dpos));
                var sides = parseInt(args[0].substring(dpos, roll.length));
                var result = helpers.roll(rolls, sides);
                discord_bot.sendMessage({
                   to: channelID,
                   message: result 
                });
                break; 
        }
    }
});