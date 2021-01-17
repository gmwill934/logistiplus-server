import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CustomerMiddleware implements NestMiddleware {
  use(req: Request, __: Response, next: NextFunction) {
    Object.keys(req.body).forEach((key) => {
      if (typeof req.body[key] === 'string') {
        if (!key.includes('password')) {
          req.body[key] = req.body[key].trim();
        }
      }
    });
    next();
  }
}
