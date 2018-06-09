let Discord  = require("discord.js");
let logger   = require("winston");
let auth     = require("./auth.json");
let commands = require("./src/commands.js");

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = "debug";

let discord_bot = new Discord.Client();

discord_bot.on("ready", () => {
    logger.info("Connection Established");
    logger.info("Running as: ");
    logger.info(discord_bot.user.tag);
    discord_bot.user.setPresence({
        game: {name: "R&C: Going Commando"},
        status: 'online'
    });
});

discord_bot.on("message", message =>  {
    commands.handleCommand(message, logger);
});

discord_bot.on("error", error => {
    logger.info("Ran into a discord error.");
    console.log(error);
});

discord_bot.login(process.env.BOT_KEY);