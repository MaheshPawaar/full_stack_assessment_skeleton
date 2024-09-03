"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
// Define routes
router.get('/find-all', userController_1.findAllUsers);
router.post('/find-by-home/:street_address', userController_1.findUsersByHome);
exports.default = router;
