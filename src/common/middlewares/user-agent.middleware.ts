import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class BlockBotMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const userAgent = req.headers['user-agent'] || '';

    if (
      userAgent.includes('Chrome/148.0.0.0') ||
      userAgent === 'Chrome 148.0.0.0'
    ) {
      throw new ForbiddenException('Access denied.');
    }

    next();
  }
}
