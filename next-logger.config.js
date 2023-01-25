// next-logger.config.js
const pino = require('pino');
const logger = (defaultConfig) =>
	pino({
		...defaultConfig,
		formatters: {
			level: (label) => {
				return { level: label };
			},
		},
		timestamp: pino.stdTimeFunctions.isoTime,
	}, pino.destination(`${__dirname}/logs/debug.log`));
module.exports = {
	logger,
};
