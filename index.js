// dependencies
const http = require('http');
const { handelReqRes } = require('./helpers/handelReqRes');


// app object - module scaffolding
const app = {};

// configuration
app.config = {
  port: 9000,
};

// create server 
app.createServer = () => {
  const server = http.createServer(app.handelReqRes);
  server.listen(app.config.port, () => {
    console.log(`Server runing ${app.config.port} port`)
  })
}

// handel req res 
app.handelReqRes = handelReqRes;

// start server 
app.createServer();