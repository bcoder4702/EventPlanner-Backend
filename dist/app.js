"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const httpServer = http_1.default.createServer(app);
const PORT = process.env.PORT || 8002;
httpServer.listen(PORT, () => {
    console.log(`🚀: Server is running at ${PORT}`);
});
