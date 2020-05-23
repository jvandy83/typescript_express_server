import 'reflect-metadata';
import { MetadataKey } from './MetadataKeys';

export function bodyValidator(...keys: string[]) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    Reflect.defineMetadata(MetadataKey.Validator, keys, target, key);
  };
}
