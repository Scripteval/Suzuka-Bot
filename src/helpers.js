let bepsi = require("../resources/bepsi.json");

module.exports = {
    roll: function(rolls, sides) {
        let result = `Rolling **${rolls}d${sides}**:`;
        let total  = 0;

        for (let i = 0; i < rolls; ++i) {
            if (i > 0) {
                result = result + ' +';
            }
            let number = Math.floor(Math.random() * Math.floor(sides + 1)) + 1;
            result = result  + ' ' + number.toString();
            total += number;
        }

        if (rolls == 1) {
            let index = result.match(": \\d").index + 2;
            result = [result.slice(0, index), "**", result.slice(index), "**"]
            .join('');
            console.log(result);
        } else {
            result = result + ": **" + total.toString() + "**";
        }

        return result; 
    },

    bepsi: function() {
        let dict = bepsi.dict;
        return dict[Math.floor(Math.random() * dict.length) + 1];
    }
};