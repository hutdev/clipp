"use strict";

function contains(array, value) {
    var found = false;
    if (array && typeof(array.length) === 'number')
        for (var i = 0; !found && i < array.length; i++)
            found = array[i] === value;
    return found;
}

exports.parse = function (flagdef) {
    var cli = {
        node: process.argv[0],
        script: process.argv[1]
    };

    function addstray(p) {
        if (!cli.strayparams)
            cli.strayparams = [];
        cli.strayparams.push(p);
    }

    function addparam(k, v) {
        if (!cli.params)
            cli.params = {};
        if (!cli.params[k])
            cli.params[k] = v;
    }

    function addflag(f) {
        if (!cli.flags)
            cli.flags = [];
        cli.flags.push(f);
    }

    function switchname(str) {
        return str.match(/^--?([a-zA-Z0-9]+)/) ? RegExp.$1 : null;
    }

    for (var i = 2; i < process.argv.length; i++) {
        var name = switchname(process.argv[i]);
        if (name)
        //Flag or parameter
            if (contains(flagdef, name) || i === process.argv.length - 1)
            //explicit or implicit flag (i.e. last param)
                addflag(name);
            else {
                var nextname = switchname(process.argv[i + 1]);
                if (nextname)
                    addflag(name);
                else
                    addparam(name, process.argv[++i]);
            }
        else
        //Stray
            addstray(process.argv[i]);
    }
    return cli;
};

exports.get = function (param, cli) {

    function getSingle(p) {
        if (cli.params && cli.params[p])
            return cli.params[p];
        if (contains(cli.flags, p))
            return true;
        return null;
    }

    if (!cli)
        cli = exports.parse();

    if (typeof(param) === 'object' && typeof(param.length) === 'number')
        for (var i in param) {
            var v = getSingle(param[i]);
            if (v)
                return v;
        }
    return getSingle(param);
};
