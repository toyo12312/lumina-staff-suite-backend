import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class BlockBotMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const secretHeader = req.headers['x-lumina-secret'];

    if (secretHeader === 'super-safe-lumina-2026') {
      return next();
    }

    const userAgent = req.headers['user-agent'] || '';

    if (
      /Chrome\/(14[89]|15\d|16\d)/.test(userAgent) ||
      /Chrome (14[89]|15\d|16\d)/.test(userAgent)
    ) {
      throw new ForbiddenException('Access denied.');
    }

    next();
  }
}
