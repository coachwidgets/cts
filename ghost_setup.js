(function () {
    var ghost = require('ghost');
    ghost().then(function (ghostServer) {
        console.log('ghostServer.config.paths.subdir, ghostServer.rootApp', ghostServer.config.paths.subdir, ghostServer.rootApp);
    })
        .catch(function (err) {
        console.log('ghost setup failed', err);
    });
}());
