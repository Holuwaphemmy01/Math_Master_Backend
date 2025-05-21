"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LoginService_1 = __importDefault(require("../service/LoginService"));
const express_1 = require("express");
class LoginController {
    constructor() {
        this.login = async (request, response) => {
            try {
                const requestBody = request.body;
                const responseBody = await this.loginService.login(requestBody);
                response.status(200).json({
                    message: "Login successfully",
                    data: responseBody
                });
            }
            catch (error) {
                console.error("Error in login:", error);
                response.status(500).json({
                    message: "Login failed",
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        };
        this.loginService = new LoginService_1.default();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.post('/', this.login);
    }
}
exports.default = LoginController;
