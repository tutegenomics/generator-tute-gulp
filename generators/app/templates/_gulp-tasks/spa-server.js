var serverFactory = require('spa-server');
var paths = require('./paths.js');

module.exports = function createServer(opts) {
    var defaults = {
        path: paths.dist.root,
        port: process.env.PORT || 9010,
        fallback: {
            'text/html' : paths.dist.root + '/index.html'
        }
    };
    var server = serverFactory.create(util._extend(defaults, opts));

    return server;
};
