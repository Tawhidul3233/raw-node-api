// dependencies
const http = require('http');

// app object - module scaffolding
const app = {};

// configuration
app.config = {
  port: 5000,
};

// create server 
app.createServer = () => {
  const server = http.createServer(app.handelReqRes);
  server.listen(app.config.port, () => {
    console.log(`Server runing ${app.config.port} port`)
  })
}

// handel req res 
app.handelReqRes = (req, res) => {
  res.end('Hello wold')
}

// invokd funcation 
app.createServer();