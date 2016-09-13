var express = require('express'), ejs = require('ejs'), path = require('path'), configPath = path.join(__dirname, 'ghost_config.js'), ghostConfig = require(configPath)[process.env.NODE_ENV], root = path.join(__dirname, 'build/unbundled'), favicon = require('serve-favicon'), logger = require('morgan'), ghost = require('ghost'), app = express();
console.log("path.join(__dirname, 'ghost_config.js'), ghostConfig", path.join(__dirname, 'ghost_config.js'), ghostConfig);
ghost({
    config: path.join(__dirname, 'ghost_config.js')
}).then(function (ghostServer) {
    console.log('ghostServer.config.paths.subdir, ghostServer.rootApp', ghostServer.config.paths.subdir, ghostServer.rootApp);
    app.use(ghostServer.config.paths.subdir, ghostServer.rootApp);
    ghostServer.start(app);
    console.log('After Ghost then', process.env.port);
    app.set('views', root)
        .engine('html', ejs.renderFile)
        .use(logger('dev'))
        .use(express.static(root))
        .get('/', function (req, res) {
        res.render('index.html');
    })
        .listen(process.env.PORT || 5000);
})
    .catch(function (err) {
    console.log('Ghost failed', err);
});
