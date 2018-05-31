let axios            = require("axios");
let Danbooru         = require("danbooru");
const eballresponses = require("../resources/8ball.json");
const memes    = require("../resources/memes.json");


module.exports = {
    roll: function(rolls, sides) {
        let result = `Rolling **${rolls}d${sides}**:`;
        let total  = 0;

        for (let i = 0; i < rolls; ++i) {
            if (i > 0) {
                result = result + ' +';
            }
            let number = Math.floor(Math.random() * sides) + 1;
            result = result  + ' ' + number.toString();
            total += number;
        }

        if (rolls == 1) {
            let index = result.match(": \\d").index + 2;
            result = [result.slice(0, index), "**", result.slice(index), "**"]
                .join('');
        } else {
            result = result + " = **" + total.toString() + "**";
        }

        return result; 
    },

    bepsi: async function() {
        const url  = "http://fictionalcompanies.wikia.com/api/v1/" +
            "Articles/Top?limit=200";
        let result = "";
        try {
            const response = await axios.get(url);
            const data = response.data.items;
            result = data[Math.floor(Math.random() * data.length)].title;
        } catch (error) {
            result = error;
        }
        return result;
    },

    eightball: function() {
        const dict = eballresponses.dict;
        return dict[Math.floor(Math.random() * dict.length)];
    },

    getDanbooruPost: async function(tags, safe) {
        const booru = (safe ? 
            new Danbooru({base: "http://safebooru.donmai.us/"})
            : new Danbooru());
        let result  = "";
        try {
            const response = await booru.posts({tags: tags});
            const post = response[Math.floor(Math.random() * response.length)];
            result = post.file_url;
        } catch (error) {
            result = error;
        }
        return result;
    },

    getMemes: async function(type) {
        let dict = [];
        let url    = "";
        let result = "";
        
        if (type == "wholesome") {
            dict = memes.wholesome;
        } else if (type == "ancap") {
            dict = memes.ancap;
        } else {
            dict = memes.bad;
        }
        url  = dict[Math.floor(Math.random() * dict.length)];

        try {
            const regex    = RegExp("(/comments/)");
            const response = await axios.get(url);
            const data     = response.data.data.children;
            let post       = "";
            while (post == "") {
                let temp = data[Math.floor(Math.random() * data.length)];
                if (!regex.test(temp.data.url)) {
                    post = temp;
                }
            }
            result = post.data.url;
        } catch (error) {
            result = error;
        }
        return result;
    }
};