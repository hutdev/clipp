"use strict";

exports.parse = function(){
  var cli = {
    node: process.argv[0],
    script: process.argv[1]
  };
  function addstray(p){
    if(!cli.strayparams)
      cli.strayparams = [];
    cli.strayparams.push(p);
  }
  function addparam(k,v){
    if(!cli.params)
      cli.params = {};
    if(!cli.params[k])
      cli.params[k] = v;
  }
  function addflag(f){
    if(!cli.flags)
      cli.flags = [];
    cli.flags.push(f);
  }
  function switchname(str){
    return str.match(/^--?([a-zA-Z0-9]+)/) ? RegExp.$1 : null;
  }
  for (var i = 2; i < process.argv.length; i++){
    var name = switchname(process.argv[i]);
    if (name)
      //Flag or parameter
      if(i === process.argv.length - 1)
        //Last param, must be flag
        addflag(name);
      else{
        var nextname = switchname(process.argv[i + 1]);
        if (nextname)
          addflag(name);
        else
          addparam(name,process.argv[++i]);
      }
    else
      //Stray
      addstray(process.argv[i]);
  }
  return cli;
};
