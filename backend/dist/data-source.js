"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
const Home_1 = require("./entities/Home");
const UserHome_1 = require("./entities/UserHome");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User_1.User, Home_1.Home, UserHome_1.UserHome],
});
exports.dataSource = dataSource;
