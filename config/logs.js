const winston = require('winston');
const { format } = require('winston');
const { combine, printf } = format;
require('winston-daily-rotate-file');

var transport = new (winston.transports.DailyRotateFile)({
    filename: 'logs/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '1m'
});

const myFormat = printf(({ level, message }) => {
    return `${level}: ${message}`;
});

var logger = winston.createLogger({
    format: combine(
        myFormat
    ),
    transports: [
        transport
    ],
    exitOnError: false, // do not exit on handled exceptions
});

logger.stream = {
    write: function (message) {
        // use the 'info' log level so the output will be picked up by both transports (file and console)
        logger.info(message);
    },
};

module.exports = logger