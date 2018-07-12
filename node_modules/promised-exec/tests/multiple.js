'use strict';

describe('Testing of module.', function () {

    var module;

    module = require('../index.js');

    function pass (value) {

        try {

            module(value);

            return true;

        } catch (e) {

            return false;

        }

    }

    it('Module must returns function.', function () {

        var type;

        type = typeof module;

        expect(type).toBe('function');

    });

    it('If function called with object, they must throw exception.', function () {

        var state;

        state = pass(); // try to pass undefined

        expect(state).toBe(false);

    });

    it('If function called with number, they must throw exception.', function () {

        var state;

        state = pass(17); // try to pass undefined

        expect(state).toBe(false);

    });

    it('If function called with null, they must throw exception.', function () {

        var state;

        state = pass(null); // try to pass undefined

        expect(state).toBe(false);

    });

    it('If function called with NaN, they must throw exception.', function () {

        var state;

        state = pass(NaN); // try to pass undefined

        expect(state).toBe(false);

    });

    it('If function called with string, they must works not throw exception.', function () {

        var state;

        state = pass('ls'); // try to pass undefined

        expect(state).toBe(true);

    });

    it('Function must return promise.', function () {

        var promise;

        promise = module('ls -l');

        expect(promise.then).toBeDefined();
        expect(promise.catch).toBeDefined();

    });

    describe('Testing async call of function with invalid command name.', function () {

        var isSucceed, response;

        beforeEach(function (done) {

            var promise;

            promise = module('some-unknown-command-name');

            function fn (boolean, result) {
                isSucceed = boolean;
                response = result;
                done();
            }

            promise.then(fn.bind(null, true));
            promise.catch(fn.bind(null, false));

        });

        it('If invalid command name passed to function, catch must be called.', function () {
            expect(isSucceed).toBe(false);
        });

        it('If invalid command name passed to function, response must contains object with buffer and string', function () {
            expect(typeof response).toBe('object');
            expect(typeof response.buffer).toBe('object');
            expect(typeof response.string).toBe('string');
        });

    });

    describe('Testing async call of function with command which has error in response.', function () {

        var isSucceed, response;

        beforeEach(function (done) {

            var promise;

            promise = module('cd some-unknown-directory');

            function fn (boolean, result) {
                isSucceed = boolean;
                response = result;
                done();
            }

            promise.then(fn.bind(null, true));
            promise.catch(fn.bind(null, false));

        });

        it('If invalid command arguments passed to function, catch must be called.', function () {
            expect(isSucceed).toBe(false);
        });

        it('If invalid command arguments passed to function, response must contains object with buffer and string', function () {
            expect(typeof response).toBe('object');
            expect(typeof response.buffer).toBe('object');
            expect(typeof response.string).toBe('string');
        });

    });

    describe('Testing async call of function with command which has haven\'t error in response.', function () {

        var isSucceed, response;

        beforeEach(function (done) {

            var promise;

            promise = module('ls -l');

            function fn (boolean, result) {
                isSucceed = boolean;
                response = result;
                done();
            }

            promise.then(fn.bind(null, true));
            promise.catch(fn.bind(null, false));

        });

        it('If correct command passed to function, `then` function must be called.', function () {
            expect(isSucceed).toBe(true);
        });

        it('If correct command passed to function, response must contains string.', function () {
            expect(typeof response).toBe('string');
        });

    });

});