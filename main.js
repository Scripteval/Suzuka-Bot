let Discord = require("discord.io");
let logger  = require("winston");
let auth    = require("./auth.json");
let helpers = require("./src/helpers.js")

const DCHARLIMIT = 2000;


logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = "debug";

let discord_bot = new Discord.Client({
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
        let args = message.substring(1).split(' ');
        let cmd = args[0].toLowerCase();
        args = args.splice(1);
        
        switch(cmd) {
            case "test": {
                discord_bot.sendMessage({
                    to: channelID,
                    message: "test"
                });
                break;
            }

            //more commands
            case "roll": {
                let regex = RegExp("\\d+d\\d+");

                if (!args.length || !regex.test(args[0].toLowerCase())) {
                    discord_bot.sendMessage({
                        to: channelID,
                        message: "Incorrect syntax! Correct usage: xdy where" +
                        " x is the number of rolls and y is the number of sides." 
                    });
                    break;
                }

                let roll = args[0].toLowerCase();
                
                let dpos = roll.search('d') + 1;
                let rolls = parseInt(roll.substring(roll, dpos));
                let sides = parseInt(args[0].substring(dpos, roll.length));

                let result = helpers.roll(rolls, sides);

                if (result.length > DCHARLIMIT) {
                    result = result.split(' ');
                    result = "Character limit reached. Result was: " +
                    result[result.length - 1];
                }
                
                discord_bot.sendMessage({
                   to: channelID,
                   message: result 
                });
                break; 
            }

            case "hi": {
                discord_bot.uploadFile({
                    to: channelID,
                    file: "./resources/kaedeHey.png",
                    message: "Hey!"
                });
                break;
            }
            
            case "shrug": {
                discord_bot.sendMessage({
                    to: channelID,
                    message: "¯\\_(ツ)_/¯"
                });
                break;
            }
                
            //my friends wanted this one
            case "bepsi": {
                let result = helpers.bepsi();
                discord_bot.sendMessage({
                    to: channelID,
                    message: result
                });
                break;
            }

            case "tamamo": {
                discord_bot.uploadFile({
                    to: channelID,
                    file: "./resources/kagerouSmirk.png"
                });
            }
        }
    }
});