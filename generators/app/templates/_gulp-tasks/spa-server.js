var serverFactory = require('spa-server');
var paths = require('./paths.js');

module.exports = function createServer() {

    var server = serverFactory.create({
        path: paths.dist.root,
        port: process.env.PORT || 9009,
        fallback: {
            'text/html' : paths.dist.root + '/index.html'
        }
    });

    return server;
};
