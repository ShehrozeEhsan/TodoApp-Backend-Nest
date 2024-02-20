import { Injectable } from "@nestjs/common";
import { winstonConfig } from "src/config/winston.config";
import { Logger } from "winston";
import * as winston from "winston";

@Injectable()
export class LoggerService {
    
    private readonly logger: Logger;

    constructor(){
        this.logger = winston.createLogger(winstonConfig);
    }

    info(message: string){
        this.logger.log({ level: "info", message });
    }

    error(message: string){
        this.logger.log({ level: "error", message});
    }
}