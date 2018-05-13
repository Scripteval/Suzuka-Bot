let bepsi   = require("../resources/bepsi.json");
let request = require("request");

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

    bepsi: function() {
        let url = "http://fictionalcompanies.wikia.com/api/v1/Articles/" + 
        "List?expand=1&limit=200";
        var result = "";
        request.get({
            url: url,
            json: true,
            headers: {"User-Agent": "request"}
        }, (err, res, data) => {
            if (err) {
                result = 'Error: ' + err;
            } else if (res.statusCode !== 200) {
                result = "Status: " + res.statusCode.toString();
            } else {
                data = data.items;
                result = data[Math.floor(Math.random() * data.length)].title;
            }
        });
        console.log(result);
        return result;
    }
};