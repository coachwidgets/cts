(function () {
let ghost = require('ghost')
ghost({
  config: path.join(__dirname, 'ghost_config.js')
}).then((ghostServer) => {
    console.log('ghostServer.config.paths.subdir, ghostServer.rootApp', ghostServer.config.paths.subdir, ghostServer.rootApp)
  })
    .catch((err) => {
      console.log('ghost setup failed', err)
    })
} ());
