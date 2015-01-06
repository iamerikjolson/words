var fs = require('fs'),
    myArgs = require('optimist').argv;

// test

String.prototype.startsWith = function (prefix){
    return this.indexOf(prefix) == 0;
};

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

if ((myArgs.h)||(myArgs.help)) {
    console.log('Input flags_TM:');
    console.log('-i Included in');
    console.log('-s Starts with');
    console.log('-e Ends with');
    console.log('Ex: -s tele (to find words that start with "tele" ');
    console.log('');
    process.exit(0);
}

if(!myArgs.i && !myArgs.s && !myArgs.e) {
    console.log('Must use one of the following flags: -h -i -s -e');
    process.exit(0);
}


fs.readFile('/usr/share/dict/words', 'utf8', function (err, data) {
    if (err) {
        throw err;
    }

    var words = data.toString().split('\n'),
        matches = 0,
        word,
        MAX_LEN = 8;

    for(var i in words) {
        word = words[i].toLowerCase();

        if(myArgs.s) {
            if(word.startsWith(myArgs.s.toLowerCase()) && word.length <= MAX_LEN) {
                matches++;
                console.log(word);
            }
        } else if (myArgs.e) {
            if(word.endsWith(myArgs.e.toLowerCase()) && word.length <= MAX_LEN) {
                matches++;
                console.log(word);
            }
        } else {
            if(word.indexOf(myArgs.i.toLowerCase()) > -1 && word.length <= MAX_LEN) {
                matches++;
                console.log(word);
            }
        }
    }

    console.log('matches: ', matches);

});