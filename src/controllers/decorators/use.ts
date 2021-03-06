import 'reflect-metadata';
import { RequestHandler } from 'express';
import { MetadataKey } from './MetadataKeys';

export function use(middleware: RequestHandler) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    const middlewares =
      Reflect.getMetadata(MetadataKey.Middleware, target, key) || [];
    Reflect.defineMetadata(
      MetadataKey.Middleware,
      [...middlewares, middleware],
      target,
      key
    );
  };
}
