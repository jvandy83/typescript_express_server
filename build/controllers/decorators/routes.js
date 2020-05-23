"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var Methods_1 = require("./Methods");
var MetadataKeys_1 = require("./MetadataKeys");
function routeBinder(method) {
    return function (path) {
        return function (target, key, desc) {
            Reflect.defineMetadata(MetadataKeys_1.MetadataKey.Path, path, target, key);
            Reflect.defineMetadata(MetadataKeys_1.MetadataKey.Method, method, target, key);
        };
    };
}
exports.get = routeBinder(Methods_1.Methods.Get);
exports.post = routeBinder(Methods_1.Methods.Post);
exports.put = routeBinder(Methods_1.Methods.Put);
exports.patch = routeBinder(Methods_1.Methods.Patch);
exports.del = routeBinder(Methods_1.Methods.Del);
