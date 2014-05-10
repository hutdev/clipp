# clipp
=====

## A Command LIne Parameter Parser for node.js

We differentiate between three types of command line parameters:
1. stray parameters ('strayparams'): Parameters which are not prefixed by '-', '--' or a parameter key (e.g. '--key value')
2. parameters ('params'): Parameters wich are prefixed by a parameter key: --key value
3. flags ('flags'): Switches which are eiter on or off, i.e. do not provide a value (e.g. '--flag1 --flag2')

Imagine the following command line is executed from /home/hut/dev/npm/clipp: 

    node test.js stray --hello world --explicitflag anotherstray --implicitflag

```javascript
require('clipp').parse();
```

Will parse the CLI command without the explicit definition of flags. This will result in the following object:
```javascript
{"node":"node","script":"/home/hut/dev/npm/clipp/test.js",
  "strayparams":["stray"],
  "params":{"hello":"world","explicitflag":"anotherstray"},
  "flags":["implicitflag"]
}
```

```javascript
require('clipp').parse(['explicitflag']);
```

Defines a single explit flag called 'explicitflag'. This will result in the following object:
```javascript
{"node":"node","script":"/home/hut/dev/npm/clipp/test.js",
  "strayparams":["stray","anotherstray"],
  "params":{"hello":"world"},
  "flags":["explicitflag","implicitflag"]
}
```

'implicitflag' is recognized as a flag because it is not followed by a value definition.


