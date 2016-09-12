let express = require('express'),
    ejs = require('ejs'),
    path = require('path'),
    root = path.join(__dirname, 'build/unbundled'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    ghost = require('ghost'),
    app = express();

ghost().then((ghostServer) => {
  console.log('ghostServer.config.paths.subdir, ghostServer.rootApp', ghostServer.config.paths.subdir, ghostServer.rootApp)
    app.use(ghostServer.config.paths.subdir, ghostServer.rootApp);
    ghostServer.start(app);
    console.log('After Ghost then', process.env.port)
    app.set('port', (process.env.PORT || 5000))
        // view engine setup
        .set('views', root)
        .engine('html', ejs.renderFile)

        // uncomment after placing your favicon in /public
        //.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
        .use(logger('dev'))
        .use(express.static(root))
        .get('/', (req, res) => {
            res.render('index.html');
        })
        .listen(app.get('port'));

})
    .catch((err) => {
        console.log('Ghost failed', err)
    })
