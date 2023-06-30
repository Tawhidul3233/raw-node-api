import { env } from 'node:process';


// module scaffolding
const environments = {};

environments.staging = {
  port: 9000,
  envName: 'staging'
}

environments.production = {
  port: 5000,
  envName: 'production'
}

// determine which env was pass
const currentEnvironment = typeof process.env.SUBJECT === 'string' ? process.env.SUBJECT : 'staging';

// export 
const environmentExport = typeof environments[currentEnvironment] === 'object' ? environments[currentEnvironment] : environments.staging;

module.exports = environmentExport;

