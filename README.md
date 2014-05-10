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

Use the 'get' method to retrieve the value of a parameter and to check whether a flag is set. Considering the command line above the following code...

```javascript
console.log(clipp.get('explicitflag'));
console.log(clipp.get('explicitflag',clipp.parse(['explicitflag'])));
console.log(clipp.get('implicitflag'));
console.log(clipp.get('nop'));
console.log(clipp.get('hello'));
console.log(clipp.get(['hello','h']));
```

...will output

```
anotherstray
true
true
null
world
```

You can define alternative parameter names by passing an array of alternatives in the get method.
