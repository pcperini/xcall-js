var module, promise;

module = require('./index.js');

promise = module('git ls-remote');

promise.then(function () {
    console.log('succeed', arguments);
});

promise.catch(function () {
    console.log('error', arguments);
});