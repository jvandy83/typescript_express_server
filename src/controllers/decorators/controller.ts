import 'reflect-metadata';
import { RequestHandler, Request, Response, NextFunction } from 'express';
import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';
import { MetadataKey } from './MetadataKeys';

function bodyValidators(...args: string[]): RequestHandler {
  let keys = args[0];
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send('No request body');
      return;
    }
    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send('No validator keys');
        return;
      }
    }
    next();
  };
}

export function controller(routePrefix: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance();
    for (let key in target.prototype) {
      let routeHandler = target.prototype[key];

      const path = Reflect.getMetadata(MetadataKey.Path, target.prototype, key);

      const method: Methods = Reflect.getMetadata(
        MetadataKey.Method,
        target.prototype,
        key
      );

      const middlewares =
        Reflect.getMetadata(MetadataKey.Middleware, target.prototype, key) ||
        [];

      const requiredBodyProps =
        Reflect.getMetadata(MetadataKey.Validator, target.prototype, key) || [];

      const validator = bodyValidators(requiredBodyProps);

      if (path) {
        router[method](
          `${routePrefix}${path}`,
          ...middlewares,
          validator,
          routeHandler
        );
      }
    }
  };
}
