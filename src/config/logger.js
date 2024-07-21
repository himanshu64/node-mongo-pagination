const winston = require('winston');
const config = require('./config');


const enumerateErrorFormat = winston.format((info) => {
    if (info instanceof Error) {
      Object.assign(info, { message: info.stack });
    }
    return info;
  });

  const logger = winston.createLogger({
    // Set the logging level based on the environment.
    level: config.env === 'development' ? 'debug' : 'info',
    format: winston.format.combine(
      // Apply the custom error format.
      enumerateErrorFormat(),
      // Colorize logs in development for better readability.
      config.env === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
      // Format log messages with string interpolation.
      winston.format.splat(),
      // Customize the final log message format.
      winston.format.printf(({ level, message }) => `${level}: ${message}`)
    ),
    transports: [
      // Log to the console. Errors are logged to stderr.
      new winston.transports.Console({
        stderrLevels: ['error'],
      }),
    ],
  });
  
  module.exports = logger; 