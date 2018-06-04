const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

const moment = require('moment');



/*
 * Create server and have it listen to port 3000 or other default ports.
 */
server.listen(port, () =>{
  console.log("Started listening on port: "+port);
});
