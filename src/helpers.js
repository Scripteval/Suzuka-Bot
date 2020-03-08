let axios            = require("axios");
let Danbooru         = require("danbooru");
const urls           = require("../resources/urls.json");
const eballresponses = require("../resources/8ball.json");

const URLARRAYLIMIT = 5;

let lastUrls = new Array(URLARRAYLIMIT);
let pointer  = 0;

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
            new Danbooru("https://safebooru.donmai.us/")
            : new Danbooru());
        let result  = "";
        try {
            const response = await booru.posts({tags: tags});
            do {
                const index = Math.floor(Math.random() * response.length);
                const post = response[index];
                result = post.file_url;
                response.splice(index, 1);
            } while (arrayContains(lastUrls, result) && 
                (response.length != 0));
        } catch (error) {
            result = error;
        }
        updateUrlArray(result);
        return result;
    },

    getRedditPics: async function(url) {
        try {
            const regex    = RegExp("(/comments/)");
            const response = await axios.get(url);
            const data     = response.data.data.children;

            let post       = "";
            do {
                while (post == "") {
                    const index = Math.floor(Math.random() * data.length);
                    let temp = data[index];
                    if (!regex.test(temp.data.url)) {
                        post = temp;
                    }
                    data.splice(index, 1);
                }
            } while (arrayContains(lastUrls, post.data.url) && 
                (data.length != 0));
            result = post.data.url;
        } catch (error) {
            result = error;
        }
        updateUrlArray(result);
        return result;
    },

    getBadMemes: async function() {
        let dict = urls.bad;
        let url  = dict[Math.floor(Math.random() * dict.length)];
        return this.getRedditPics(url);
    },

    getWholesomeMemes: async function() {
        let dict = urls.wholesome;
        let url  = dict[Math.floor(Math.random() * dict.length)];
        return this.getRedditPics(url);
    },

    getAncapMemes: async function() {
        let dict = urls.ancap;
        let url  = dict[Math.floor(Math.random() * dict.length)];
        return this.getRedditPics(url);
    },

    getDogPics: async function() {
        let dict = urls.dog;
        let url  = dict[Math.floor(Math.random() * dict.length)];
        return this.getRedditPics(url);
    },

    getCatPics: async function() {
        let dict = urls.cat;
        let url  = dict[Math.floor(Math.random() * dict.length)];
        return this.getRedditPics(url);
    },

    getAwwPics: async function() {
        let result = null;
        let dict   = urls.aww;
        dict.concat(urls.dog, urls.cat);
        let url    = dict[Math.floor(Math.random() * dict.length)];
        return this.getRedditPics(url);    
    },

    getBeans: async function() {
        let result = null;
        let dict   = urls.beans;
        let url    = dict[0];
        return this.getRedditPics(url);
    }
};

const arrayContains = function(array, item) {
    return (array.indexOf(item) > -1);  
};

const updateUrlArray = function(url) {
    lastUrls[pointer] = url;
    pointer = (pointer == URLARRAYLIMIT - 1) ? 0 : pointer + 1;
};