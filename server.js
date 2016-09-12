var express = require('express'), ejs = require('ejs'), path = require('path'), root = path.join(__dirname, 'build/unbundled'), favicon = require('serve-favicon'), logger = require('morgan'), ghost = require('ghost'), app = express();
ghost().then(function (ghostServer) {
    app.use(ghostServer.config.paths.subdir, ghostServer.rootApp);
    ghostServer.start(app);
    app.set('port', (process.env.PORT || 5000))
        .set('views', root)
        .engine('html', ejs.renderFile)
        .use(logger('dev'))
        .use(express.static(root))
        .use(function (req, res, next) {
        var err = {
            message: 'Not Found',
            status: 404
        };
        next(err);
    });
    if (process.env === 'develop') {
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    })
        .get('/', function (req, res) {
        res.render('index.html');
    })
        .listen(app.get('port'));
});
