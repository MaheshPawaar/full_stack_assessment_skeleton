"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUsersByHome = exports.findAllUsers = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const UserHome_1 = require("../entities/UserHome");
const { dataSource } = require('../data-source');
const userRepository = dataSource.getRepository(User_1.User);
const userHomeRepository = dataSource.getRepository(UserHome_1.UserHome);
const findAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userRepository.find();
        res.json(users);
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.findAllUsers = findAllUsers;
const findUsersByHome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { street_address } = req.params;
    if (typeof street_address !== 'string') {
        res
            .status(400)
            .json({ error: 'Missing or invalid street_address parameter' });
        return; // Ensure to return to avoid further processing
    }
    try {
        // Find all UserHome records related to the given street_address
        const userHomes = yield userHomeRepository.find({
            where: { street_address },
        });
        // Extract usernames from UserHome records
        const usernames = userHomes.map((uh) => uh.username);
        // Find users by usernames
        const users = yield userRepository.findBy({
            username: (0, typeorm_1.In)(usernames),
        });
        res.json(users);
    }
    catch (error) {
        console.error('Error fetching users by home:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.findUsersByHome = findUsersByHome;
