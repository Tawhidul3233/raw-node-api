
const handler = {};

handler.notFoundHandler = (requestProperties, callback) => {
  console.log(requestProperties);
  callback(200, {
    message: 'Not found'
  })
}

module.exports = handler;