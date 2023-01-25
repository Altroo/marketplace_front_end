// next-logger.config.js
const pino = require('pino')
// const levels = {
//   http: 10,
//   debug: 20,
//   info: 30,
//   warn: 40,
//   error: 50,
//   fatal: 60,
// };
module.exports = pino(
  {
    // customLevels: levels, // our defined levels
    // useOnlyCustomLevels: true,
    level: 'debug',
    formatters: {
      level: (label) => {
        return { level: label };
      },
    },
    name: 'next-log',
    errorKey: 'Error',
    messageKey: 'Info',
    enabled: true,
    timestamp: pino.stdTimeFunctions.isoTime,
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'SYS:standard',
        colorize: true,
        levelFirst: true,
      },
    },
  },
  pino.destination(`${__dirname}/debug/debug.log`)
)
