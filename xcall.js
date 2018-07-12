const exec = require('promised-exec');
const querystring = require('querystring');

const xcall = './bin/xcall.app/Contents/MacOS/xcall';
const client = function(scheme) {
  return {
    call: (action, params) => {
      return exec(
        `${xcall} ` +
        `-url ${scheme}://x-callback-url/${action}?${querystring.stringify(params)}`
      );
    }
  };
};

exports.xcall = client;
