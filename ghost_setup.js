(function () {
    var ghost = require('ghost'), path = require('path'), config = require(path.join(__dirname, 'ghost_config.js'));
    console.log('config', JSON.stringify(config), process.env.NODE_ENV);
    ghost({
        config: path.join(__dirname, 'ghost_config.js')
    }).then(function (ghostServer) {
        console.log('ghostServer.config.paths.subdir, ghostServer.rootApp', ghostServer.config.paths.subdir, ghostServer.rootApp);
    })
        .catch(function (err) {
        console.log('ghost setup failed', err);
    });
}());
