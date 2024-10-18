/*
 * _logging.ts
 * Contains winston logger config and global app logger.
 *
 * Logging levels:
 *  - error
 *  - warn
 *  - info
 *  - verbose
 *  - debug
 *  - silly
 */

import winston from 'winston';

const todayUTC = new Date();
const utcDateString = `${todayUTC.getUTCFullYear()}-${(todayUTC.getUTCMonth() + 1).toString().padStart(2, '0')}-${todayUTC.getUTCDate().toString().padStart(2, '0')}`;

const logger = winston.createLogger({
    level: process.env.NEXT_LOG_LEVEL || "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(
            (info) => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`,
        ),
    ),
    transports: [
        new winston.transports.Console({}),
        new winston.transports.File({ filename: `logs/${utcDateString}.log` }),
    ]
})

export default logger;