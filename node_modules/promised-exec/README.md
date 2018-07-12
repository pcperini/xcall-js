<p align="center">
  <a href="https://github.com/yakimchuk/promised-exec">
    <img height="214" width="214" src="http://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"/>
  </a>
</p>

# [promised-exec](https://github.com/yakimchuk-me/promised-exec) #
>  Promised version of NodeJS child_process exec.

## How to install this module?
To install this module use following command at root path of your module:
``` bash
npm install promised-exec --save
```

## Usage
This module exports function which waits only one argument on input: string with terminal command.

Function returns promise (based on library "q").

If command is invalid, the `catch` function will be called with object which contains string with error, and default error buffer (argument error of exec callback).

If command is valid, but response of command is error, the `catch` function will be called with object which contains string with error, and default error buffer (argument error of exec callback).

If command is valid, and response is correct, the `the` function will be called with string which contains response of command.

**Example (correct command):**

``` javascript

var exec, promise;

exec = require('promised-exec');

promise = exec('ls -l');

promise.then(function (responseString) {

    /*
     * Now variable 'responseString' contains string:
     *
     *  "-rwxrwxrwx 1 root root   29 дек  6 09:58 config.json
     *   -rwxrwxrwx 1 root root  142 дек  6 09:58 gulpfile.js
     *   -rwxrwxrwx 1 root root  224 дек  6 09:58 gulptask.test.js
     *   -rwxrwxrwx 1 root root  796 дек  6 10:34 index.js
     *   -rwxrwxrwx 1 root root 1093 дек  6 09:58 LICENSE
     *   drwxrwxrwx 1 root root    0 дек  6 09:59 node_modules
     *   -rwxrwxrwx 1 root root  713 дек  6 09:58 package.json
     *   -rwxrwxrwx 1 root root 3051 дек  6 10:51 README.md
     *   drwxrwxrwx 1 root root    0 дек  6 10:35 tests"
     *
     */

});

. . .

```

**Example (incorrect command):**

``` javascript

var exec, promise;

exec = require('promised-exec');

promise = exec('some-unknown-command');

promise.catch(function (errorObject) {

    /*
     * Now variable 'errorObject' contains object:
     *
     *   {"buffer": <Buffer>,"string":"Error: Command failed: /bin/sh: some-unknown-command: command not found\n"}
     *
     */

});

. . .

```

**Example (incorrect command arguments):**

``` javascript

var exec, promise;

exec = require('promised-exec');

promise = exec('ls -w');

promise.catch(function (errorObject) {

    /*
     * Now variable 'errorObject' contains object:
     *
     *   {"buffer": <Buffer>,"string":"Error: Command failed: ls: key must be used with argument \"w\"\nUse command \"ls --help\" to get additional information.\n"}
     *
     */

});

. . .

```