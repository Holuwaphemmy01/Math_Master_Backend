"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CorrectAnswerService_1 = __importDefault(require("../service/CorrectAnswerService"));
const express_1 = require("express");
class CorrectAnswerController {
    constructor() {
        this.correct = async (request, response) => {
            try {
                const requestBody = request.body;
                const responseBody = await this.correctAnswerService.checkAnswer(requestBody);
                response.status(200).json({
                    message: "Success",
                    data: responseBody
                });
            }
            catch (error) {
                console.error("Error in checking answer:", error);
                response.status(500).json({
                    message: "Checking for answer failed",
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        };
        this.correctAnswerService = new CorrectAnswerService_1.default();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.post('/', this.correct);
    }
}
exports.default = CorrectAnswerController;
