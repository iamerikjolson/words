var fs = require('fs'),
    args = require('optimist').argv;

String.prototype.startsWith = function (prefix){
    return this.indexOf(prefix) == 0;
};

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

if ((args.h)||(args.help)) {
    console.log('One of the following flags is required:');
    console.log('-i Included in');
    console.log('-s Starts with');
    console.log('-e Ends with');
    console.log();
    console.log('Optional flags');
    console.log('-m The max word length to consider. Words longer than this value will be ignored.');
    console.log();
    console.log('Example: node search.js -s tele (to find words that start with "tele" ');
    console.log('');
    process.exit(0);
}

if(!args.i && !args.s && !args.e) {
    console.log('Must use one of the following flags: -i -s -e');
    process.exit(0);
}

fs.readFile('/usr/share/dict/words', 'utf8', function (err, data) {
    if (err) {
        throw err;
    }

    var words = data.toString().split('\n'),
        matches = 0,
        word,
        MAX_LEN = args.m || Number.MAX_VALUE;

    for(var i in words) {
        word = words[i].toLowerCase();

        if(word.length > MAX_LEN) {
            continue;
        }

        if(args.s) {
            if(word.startsWith(args.s.toLowerCase())) {
                matches++;
                console.log(word);
            }
        } else if (args.e) {
            if(word.endsWith(args.e.toLowerCase())) {
                matches++;
                console.log(word);
            }
        } else {
            if(word.indexOf(args.i.toLowerCase()) > -1) {
                matches++;
                console.log(word);
            }
        }
    }

    console.log('matches: ', matches);
});