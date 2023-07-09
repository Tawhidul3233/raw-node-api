// depnedencies
const { StringDecoder } = require('string_decoder');
const url = require('url');
const routes = require('../routes');
const {notFoundHandler} = require('../handlers/routeHandlers/notFoundHandler');

// module scaffolding 
const helpers = {};

helpers.handelReqRes = (req, res) => {
  const parseUrl = url.parse(req.url, true);
  const path = parseUrl.pathname;
  const trimPath = path.replace(/^\/+|\/+$/g, '')
  const method = req.method.toLowerCase();
  const queryStringObject = parseUrl.query;
  const headersObject = req.headers;

  const requestProperties = {
    parseUrl,
    path,
    trimPath,
    method,
    queryStringObject,
    headersObject
  }

  const decoder = new StringDecoder('utf-8');
  let realData = ''

  const chosenHandler = routes[trimPath] ? routes[trimPath] : notFoundHandler;

  

  req.on('data', (buffer) => {
    realData += decoder.write(buffer);
  });

  req.on('end', () => {
    realData += decoder.end();

    chosenHandler(requestProperties, (statusCode, payload)=>{
      statusCode = typeof statusCode === 'number' ? statusCode : 500;
      payload = typeof payload === 'object' ? payload : {};
  
      const payloadString = JSON.stringify(payload);
  
      res.setHeader('Content-Type', 'application/json')
      res.writeHead(statusCode);
      res.end(payloadString);
  
    })
    
    // console.log(realData);


    
  })

}

module.exports = helpers;