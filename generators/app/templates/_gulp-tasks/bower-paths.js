var wiredep = require('wiredep');

exports.getBowerJSPaths = function() {
    return wiredep().js;
};
