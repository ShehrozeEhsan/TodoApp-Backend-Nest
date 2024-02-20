import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from 'src/common/constants';

declare global {
  namespace Express {
    interface Request {
      accessToken?: string;
      user?: any
    }
  }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  private logger = new Logger('Middleware')

  use(req: Request, res: Response, next: NextFunction) {

    this.logger.log(req.url);

    const authHeader = req.headers['authorization'];

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const accessToken = authHeader.substring(7); 
      const decoded: any = jwt.verify(accessToken, jwtConstants.secret);
      req.accessToken = accessToken; 
      req.user = decoded;
    }
    next();
  }
}
