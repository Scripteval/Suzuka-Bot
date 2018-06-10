let helpers = require("./helpers.js");

const DCHARLIMIT = 2000;

module.exports = {
    handleCommand: function(message, logger) {
        //Look for commands starting with '!'
        let content = message.content;
        if (content[0] == '!') {
            let args = content.substring(1).split(' ');
            let cmd = args[0].toLowerCase();
            args = args.splice(1);
            
            switch(cmd) {
                case "test": {
                    message.channel.send("test");
                    break;
                }

                //more commands
                case "roll": {
                    let regex = RegExp("\\d+d\\d+");

                    if (!args.length || !regex.test(args[0].toLowerCase())) {
                        message.channel.send("Usage: ``!roll xdy`` where " +
                            "x is the number of rolls and y is the number of " +
                            "sides."
                        );
                        break;
                    }

                    let roll = args[0].toLowerCase();
                    
                    let dpos = roll.search('d') + 1;
                    let rolls = parseInt(roll.substring(0, dpos));
                    let sides = parseInt(args[0].substring(dpos, roll.length));

                    if (rolls > 10 || rolls < 1) {
                        message.channel.send("Please roll at least 1 or " +
                            "at most 10 dice.");
                        break;
                    }

                    let result = helpers.roll(rolls, sides);

                    if (result.length > DCHARLIMIT) {
                        result = result.split(' ');
                        result = "Character limit reached. Result was: " +
                            result[result.length - 1];
                    }
                    
                    message.channel.send(result);
                    break; 
                }

                case "hi": {
                    message.channel.send("Hey!", {
                        files: ["./resources/kaedeHey.png"]
                    });
                    break;
                }
                
                case "shrug": {
                    message.channel.send("¯\\_(ツ)_/¯");
                    break;
                }
                    
                //my friends wanted this one
                case "bepsi": {
                    const result = helpers.bepsi();
                    result.then(result => {
                        message.channel.send(result);
                    });
                    break;
                }

                case "tamamo": {
                    message.channel.send({
                        files: ["./resources/kagerouSmirk.png"]
                    });
                    break;
                }

                case "8ball": {
                    const result = helpers.eightball();
                    message.channel.send(result);
                    break;
                }

                case "avatar": {
                    let result = ""; 
                    if (!args.length) {
                        result = message.author.avatarURL;
                    } else if (message.mentions.users.first()) {
                        result = message.mentions.users.first().avatarURL;
                    } else {
                        result = "Usage: ``!avatar [@user]``.";
                    }
                    message.channel.send(result);
                    break;
                }

                case "jeff": {
                    message.channel.send({
                        files: ["./resources/jeff.png"]
                    });
                    break;
                }
                
                case "safebooru":
                case "danbooru": {
                    let safe = (cmd == "safebooru");
                    const argTags = args.join(' ');
                    const result = helpers.getDanbooruPost(argTags, safe);
                    result.then(url => {
                        message.channel.send(url).catch(error => {
                            console.log(error);
                            message.channel.send("Search returned no results.");
                        });
                    });
                    break;
                }

                case "ancap": {
                    const result = helpers.getAncapMemes();
                    result.then(url => {
                        message.channel.send(url).catch(error => {
                            console.log(error);
                            message.channel.send("Search returned no results.");
                        });
                    });
                    break;
                }

                case "wholesomememe": {
                    const result = helpers.getWholesomeMemes();
                    result.then(url => {
                        message.channel.send(url).catch(error => {
                            console.log(error);
                            message.channel.send("Search returned no results.");
                        });
                    });
                    break;
                }

                case "badmeme": {
                    const result = helpers.getBadMemes();
                    result.then(url => {
                        message.channel.send(url).catch(error => {
                            console.log(error);
                            message.channel.send("Search returned no results.");
                        });
                    });
                    break;
                }

                case "aww": {
                    const result = helpers.getAwwPics();
                    result.then(url => {
                        message.channel.send(url).catch(error => {
                            console.log(error);
                            message.channel.send("Search returned no results.");
                        });
                    });
                    break;
                }

                case "dog": {
                    const result = helpers.getDogPics();
                    result.then(url => {
                        message.channel.send(url).catch(error => {
                            console.log(error);
                            message.channel.send("Search returned no results.");
                        });
                    });
                    break;
                }

                case "cat": {
                    const result = helpers.getCatPics();
                    result.then(url => {
                        message.channel.send(url).catch(error => {
                            console.log(error);
                            message.channel.send("Search returned no results.");
                        });
                    });
                    break;
                }

                case "pat": {
                    const argTags = "petting hand_on_another's_head";
                    let msg     = "There there, I will pat you, ";
                    if (!args.length) {
                        const user = message.author;
                        msg = msg + "<@" + user.id + ">.\n";
                    } else if (message.mentions.users.first()) {
                        const user = message.mentions.users.first();
                        msg = msg + "<@" + user.id + ">.\n";
                    } else {
                        msg = "Usage: ``!pat [@user]``.";
                    }
                    const result = helpers.getDanbooruPost(argTags, true);
                    result.then(url => {
                        message.channel.send(msg + url).catch(error => {
                            console.log(error);
                            message.channel.send("Search returned no results.");
                        });
                    });
                    break;
                }

                case "birthday": {
                    let result = "";
                    const url = "http://itsyourbirthday.today/#";
                    if (!args.length) {
                        const user = message.author;
                        result = "Happy birthday <@" + user.id + ">!\n";
                        result = result + url + user.username;
                    } else if (message.mentions.users.first()) {
                        const user = message.mentions.users.first();
                        result = "Happy birthday <@" + user.id + ">!\n";
                        result = result + url + user.username;
                    } else {
                        result = "Usage: ``!birthday [@user]``.";
                    }
                    message.channel.send(result);
                    break;
                }

                case "dog": {

                }
            }
        }
    }
}