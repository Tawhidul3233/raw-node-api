// dependencies
const http = require('http');
const { handelReqRes } = require('./helpers/handelReqRes');
const data = require('./lib/data')
// const environments = require('./helpers/environments');


// app object - module scaffolding
const app = {};


// make data 
const newUser = {
  name: 'Akash',
  age: 55
}
// write data to server
data.create('test', 'newFile', newUser, (err) => {
  console.log(err)
})

app.config = {
  port: 5000,
}
// app.production = {
//   port: 9000,
//   envName: 'production'
// }


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