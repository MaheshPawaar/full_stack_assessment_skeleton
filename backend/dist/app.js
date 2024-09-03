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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const data_source_1 = require("./data-source");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const homeRoutes_1 = __importDefault(require("./routes/homeRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
}));
app.use(body_parser_1.default.json());
app.use('/user', userRoutes_1.default);
app.use('/home', homeRoutes_1.default);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield data_source_1.dataSource.initialize();
        console.log('Data Source has been initialized!');
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    }
    catch (error) {
        console.error('Error during Data Source initialization', error);
    }
});
startServer();
