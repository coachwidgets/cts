let express = require('express'),
    ejs = require('ejs'),
    path = require('path'),
    root = path.join(__dirname, 'build/unbundled'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    ghost = require('ghost'),
    app = express();

ghost().then((ghostServer) => {
    app.use(ghostServer.config.paths.subdir, ghostServer.rootApp);
    ghostServer.start(app);

    app.set('port', (process.env.PORT || 5000))
        // view engine setup
        .set('views', root)
        .engine('html', ejs.renderFile)

        // uncomment after placing your favicon in /public
        //.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
        .use(logger('dev'))
        .use(express.static(root))

        // catch 404 and forward to error handler
        .use((req, res, next) => {
            let err = {
                message: 'Not Found',
                status: 404
            }
            next(err);
        });

    // error handlers

    // development error handler
    // will print stacktrace
    if (process.env === 'develop') {
        app.use((err, req, res, next) => {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    })
        .get('/', (req, res) => {
            res.render('index.html');
        })
        .listen(app.get('port'));
})
