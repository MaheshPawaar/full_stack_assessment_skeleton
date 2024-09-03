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
exports.UserHome = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Home_1 = require("./Home");
let UserHome = class UserHome {
};
exports.UserHome = UserHome;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar' }),
    __metadata("design:type", String)
], UserHome.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar' }),
    __metadata("design:type", String)
], UserHome.prototype, "street_address", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, user => user.username, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'username', referencedColumnName: 'username' }),
    __metadata("design:type", User_1.User)
], UserHome.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Home_1.Home, home => home.userHomes, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'street_address', referencedColumnName: 'street_address' }),
    __metadata("design:type", Home_1.Home)
], UserHome.prototype, "home", void 0);
exports.UserHome = UserHome = __decorate([
    (0, typeorm_1.Entity)('user_home_new')
], UserHome);
