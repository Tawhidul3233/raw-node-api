const { sampleHandler } = require("./handlers/routeHandlers/sampleHandler");

const routes = {
  'sample': sampleHandler,
  '/': sampleHandler
}

module.exports = routes;