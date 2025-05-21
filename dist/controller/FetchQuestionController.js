"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FetchQuestionService_1 = __importDefault(require("../service/FetchQuestionService"));
const express_1 = require("express");
class LoginController {
    constructor() {
        this.question = async (request, response) => {
            try {
                const requestBody = request.body;
                const responseBody = await this.fetchQuestionService.questions(requestBody);
                response.status(200).json({
                    message: "Success",
                    data: responseBody
                });
            }
            catch (error) {
                console.error("Error in fetching question:", error);
                response.status(500).json({
                    message: "Fetch question failed",
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        };
        this.fetchQuestionService = new FetchQuestionService_1.default();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.post('/', this.question);
    }
}
exports.default = LoginController;
