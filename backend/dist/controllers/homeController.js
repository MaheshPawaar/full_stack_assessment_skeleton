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
exports.updateUsersForHome = exports.findHomeByUser = void 0;
const typeorm_1 = require("typeorm");
const data_source_1 = require("../data-source");
const Home_1 = require("../entities/Home");
const UserHome_1 = require("../entities/UserHome");
const homeRepository = data_source_1.dataSource.getRepository(Home_1.Home);
const userHomeRepository = data_source_1.dataSource.getRepository(UserHome_1.UserHome);
const findHomeByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    try {
        // Find all street addresses related to the given username
        const userHomes = yield userHomeRepository.find({ where: { username } });
        // Extract street addresses
        const streetAddresses = userHomes.map((uh) => uh.street_address);
        // Find all homes with those street addresses
        const homes = yield homeRepository.find({
            where: { street_address: (0, typeorm_1.In)(streetAddresses) },
        });
        // Send homes as JSON response
        res.json(homes);
    }
    catch (error) {
        console.error('Error fetching homes by user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.findHomeByUser = findHomeByUser;
const updateUsersForHome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { street_address } = req.params;
    const { users } = req.body;
    // Decode the street_address parameter
    const decodedStreetAddress = decodeURIComponent(street_address);
    console.log('Received users:', users); // Debugging log
    // Validate that 'users' is an array
    if (!Array.isArray(users)) {
        res.status(400).json({ error: 'Invalid users data' });
        return;
    }
    try {
        // Find the home using the decoded street_address
        const home = yield homeRepository.findOneBy({
            street_address: decodedStreetAddress,
        });
        if (!home) {
            res.status(404).json({ error: 'Home not found' });
            return;
        }
        // Find all the current users associated with the home using the decoded street_address
        const currentUsers = yield userHomeRepository.find({
            where: { street_address: decodedStreetAddress },
        });
        // Extract the usernames of the current users
        const currentUsernames = currentUsers.map((uh) => uh.username);
        // Determine which users need to be added and which need to be removed
        const usersToAdd = users.filter((username) => !currentUsernames.includes(username));
        const usersToRemove = currentUsernames.filter((username) => !users.includes(username));
        // Remove users no longer associated with the home
        if (usersToRemove.length > 0) {
            yield userHomeRepository.delete({
                username: (0, typeorm_1.In)(usersToRemove),
                street_address: decodedStreetAddress,
            });
        }
        // Add new Users to the home
        if (usersToAdd.length > 0) {
            const newRelations = usersToAdd.map((username) => ({
                username,
                street_address: decodedStreetAddress,
            }));
            yield userHomeRepository.save(newRelations);
        }
        res.status(200).json({ message: 'Users updated successfully.' });
    }
    catch (error) {
        console.error('Error updating users for home', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.updateUsersForHome = updateUsersForHome;
