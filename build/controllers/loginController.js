"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var decorators_1 = require("./decorators");
exports.router = express_1.Router();
var requireAuth = function () {
    return function (req, res, next) {
        req.session && req.session.loggedIn
            ? next()
            : res.status(403).send('Not Authorized');
    };
};
var LoginController = /** @class */ (function () {
    function LoginController() {
    }
    LoginController.prototype.getLogin = function (req, res) {
        res.send("\n    <form method=\"POST\">\n      <div>\n        <label>Email</label>\n        <input name=\"email\" />\n      </div>\n      <div>\n        <label>Password</label>\n        <input name=\"password\" type=\"password\" />\n      </div>\n      <button>Submit</button>\n      <a href=\"/auth\">Home</a>\n    </form>\n  ");
    };
    LoginController.prototype.postLogin = function (req, res) {
        var _a = req.body, email = _a.email, password = _a.password;
        if (email === 'test@test' && password === '123') {
            req.session = { loggedIn: true };
            return res.redirect('/auth');
        }
        res.status(422).send('User not found');
    };
    LoginController.prototype.getAuth = function (req, res) {
        var isLoggedIn = req.session && req.session.loggedIn;
        res.send("\n    <div>\n      <h1>" + (isLoggedIn ? 'You are logged in...' : 'You are logged out...') + "</h1>\n        <a href=" + (isLoggedIn ? '/auth/logout' : '/auth/login') + ">" + (isLoggedIn ? 'logout' : 'login') + " </a>\n    <a href=\"/auth/protected\">protected</a>\n    </div>\n  ");
    };
    LoginController.prototype.getProtected = function (req, res) {
        res.send('This route is protected...');
    };
    LoginController.prototype.getLogout = function (req, res) {
        if (req.session) {
            req.session.loggedIn = undefined;
        }
        res.redirect('/auth');
    };
    __decorate([
        decorators_1.get('/login'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "getLogin", null);
    __decorate([
        decorators_1.post('/login'),
        decorators_1.bodyValidator('email', 'password'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "postLogin", null);
    __decorate([
        decorators_1.get('/'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "getAuth", null);
    __decorate([
        decorators_1.get('/protected'),
        decorators_1.use(requireAuth()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "getProtected", null);
    __decorate([
        decorators_1.get('/logout'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "getLogout", null);
    LoginController = __decorate([
        decorators_1.controller('/auth')
    ], LoginController);
    return LoginController;
}());
