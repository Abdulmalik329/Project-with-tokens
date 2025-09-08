const  winston  =  require ( 'winston' ) ; 
require ( 'winston-mongodb' ) ;
const { createLogger, format, transports } = require('winston');
const { MongoDB } = require('winston/lib/winston/transports');
const { combine, timestamp, label, printf, colorize, json } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(
    // colorize(),
    label({ label: 'right meow!' }),
    timestamp(),
    myFormat,
    json()
  ),
  transports: [
    new transports.Console({level:"debug"}),
    new transports.File({filename: "log/error.log", level: "error"}),
    new transports.File({filename: "log/commit.log", level: "info"}),
    new transports.MongoDB({db: "mongodb://localhost:27017/mydb"})
]
});

logger.exitOnError = false

logger.exceptions.handle(
    new transports.File({filename: "log/exceptions.log"})
);

logger.exceptions.handle(
    new transports.File({filename: "log/rejections.log"})
);

module.exports = logger