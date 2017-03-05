const http = require('http');
const config = require('./config');

// Create Express web app
const app = require('./webapp');

// Create an HTTP server and listen on the configured port
const server = http.createServer(app);
server.listen(config.port, function() {
  console.log('Express server listening on *:' + config.port);
});
