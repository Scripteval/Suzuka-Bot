let bepsi = require("../resources/bepsi.json");

module.exports = {
    roll: function(rolls, sides) {
        var result = `Rolling **${rolls}d${sides}**:`;
        var total  = 0;
        for (var i = 0; i < rolls; ++i) {
            if (i > 0) {
                result = result + ' +';
            }
            var number = Math.floor(Math.random() * Math.floor(sides + 1)) + 1;
            result = result  + ' ' + number.toString();
            total += number;
        }
        result = result + ": **" + total.toString() + "**";
        return result; 
    },

    bepsi: function() {
        let dict = bepsi.dict;
        return dict[Math.floor(Math.random() * dict.length) + 1];
    }
};