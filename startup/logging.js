import winston from "winston";
import eas from "express-async-errors"

export function logger() {
  winston.add(
    new winston.transports.File({ filename: "logfile.log", level: "silly" })
  );
};
