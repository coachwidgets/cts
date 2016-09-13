var express = require('express'), ejs = require('ejs'), path = require('path'), configPath = path.join(__dirname, 'ghost/config.js'), ghostConfig = require(configPath)[process.env.NODE_ENV], root = path.join(__dirname, 'build/unbundled'), favicon = require('serve-favicon'), logger = require('morgan'), ghost = require('ghost'), app = express();
console.log("path.join(__dirname, 'ghost/config.js'), ghostConfig", path.join(__dirname, 'ghost/config.js'), ghostConfig);
ghost({
    config: path.join(__dirname, 'ghost/config.js')
}).then(function (ghostServer) {
    console.log('ghostServer.config.paths.subdir, ghostServer.rootApp', ghostServer.config.paths.subdir, ghostServer.rootApp);
    app.use(ghostServer.config.paths.subdir, ghostServer.rootApp);
    app.set('views', root)
        .engine('html', ejs.renderFile)
        .use(logger('dev'))
        .use(express.static(root))
        .get('/a', function (req, res) {
        res.render('index.html');
    });
    ghostServer.start(app);
    console.log('After Ghost then', process.env.port);
})
    .catch(function (err) {
    console.log('Ghost failed', err);
});
