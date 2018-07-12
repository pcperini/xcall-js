'use strict';

var exec, getBufferContents;

exec = require('child_process').exec;

getBufferContents = function (buffer) {
    return {
        buffer: buffer,
        string: buffer.toString('utf8')
    };
};

module.exports = function (command) {

    var q, deferred;

    q = require('q');

    if (!command || typeof command !== 'string') {
        throw {
            message: 'Command must be a string.'
        };
    }

    deferred = q.defer();

    exec(command, function (error, stdout, stderr) {

        if (error) {
            return deferred.reject(getBufferContents(error));
        }

        if (stderr && !stdout) { // @note: stderr can be getted with stdout at one time!
            return deferred.reject(getBufferContents(stderr));
        }

        deferred.resolve(stdout.toString('utf8'));

    });

    return deferred.promise;

};

