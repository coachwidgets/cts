var express = require('express'), ejs = require('ejs'), path = require('path'), ghostConfigPath = path.join(__dirname, 'ghost/config.js'), root = path.join(__dirname, 'build/unbundled'), favicon = require('serve-favicon'), logger = require('morgan'), ghost = require('ghost'), app = express();
ghost({
    config: ghostConfigPath
}).then(function (ghostServer) {
    console.log('ghostServer.config.paths.subdir, ghostServer.rootApp', ghostServer.config.paths.subdir, ghostServer.rootApp);
    ghostServer.start();
})
    .catch(function (err) {
    console.log('Ghost failed', err);
});
