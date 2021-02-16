const winston = require('winston');
const { format, transports } = require('winston');
const { combine, timestamp, printf } = format;
require('winston-daily-rotate-file');

var transport = new (winston.transports.DailyRotateFile)({
    filename: 'logs/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
});

const myFormat = printf(({ level, message, label, timestamp }) => {
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
    write: function (message, encoding) {
        // use the 'info' log level so the output will be picked up by both transports (file and console)
        logger.info(message);
    },
};

module.exports = logger