"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ExplainAndAnswerService_1 = __importDefault(require("../service/ExplainAndAnswerService"));
const express_1 = require("express");
class ExplainQuestionController {
    constructor() {
        this.explain = async (request, response) => {
            try {
                const requestBody = request.body;
                const responseBody = await this.explainAndAnswerService.explain(requestBody);
                response.status(200).json({
                    message: "Success",
                    data: responseBody
                });
            }
            catch (error) {
                console.error("Error in explaining question:", error);
                response.status(500).json({
                    message: "Explain question failed",
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        };
        this.explainAndAnswerService = new ExplainAndAnswerService_1.default();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.post('/', this.explain);
    }
}
exports.default = ExplainQuestionController;
