"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const http_1 = tslib_1.__importDefault(require("http"));
const app_1 = require("./app");
const server = http_1.default.createServer(app_1.app);
server.listen(app_1.port, () => {
    console.log(`Server is listening on port ${app_1.port}.`);
});
