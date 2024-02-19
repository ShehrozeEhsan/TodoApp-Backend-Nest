// auth.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      accessToken?: string; // Declare accessToken property on Request interface
    }
  }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const accessToken = authHeader.substring(7); // 'Bearer ' is 7 characters long
      req.accessToken = accessToken; // Attach the accessToken to the request object for later use
    }

    next();
  }
}
