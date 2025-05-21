"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RegisterService_1 = __importDefault(require("../service/RegisterService"));
const express_1 = require("express");
class RegisterController {
    constructor() {
        this.registerService = new RegisterService_1.default();
        this.register = async (request, response) => {
            try {
                const requestBody = request.body;
                const responseBody = await this.registerService.register(requestBody);
                response.status(201).json({
                    message: "User created successfully",
                    data: responseBody
                });
            }
            catch (error) {
                console.error("Error in register:", error);
                response.status(500).json({
                    message: "Registration failed",
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        };
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.post('/', this.register);
    }
}
exports.default = RegisterController;
