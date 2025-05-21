"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const UserRepository_1 = __importDefault(require("../repository/UserRepository"));
const data_source_1 = require("../data-source");
const User_1 = require("../data/model/User");
class CorrectAnswerService {
    constructor() {
        this.userRepository = new UserRepository_1.default(data_source_1.AppDataSource.getRepository(User_1.User));
    }
    async checkAnswer(checkAnswerRequest) {
        const dbResponse = await this.userRepository.findByUsername(checkAnswerRequest.username);
        if (!dbResponse)
            throw new Error("User does not exist");
        const age = dbResponse.age;
        const prompt = `
Solve this math question and return only the final numerical answer.
Do not include any explanation, words, or markdown.
Question: "${checkAnswerRequest.question}"
Answer:
`.trim();
        let geminiResult = "";
        try {
            const response = await axios_1.default.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent', {
                contents: [
                    {
                        parts: [{ text: prompt }],
                        role: 'user'
                    }
                ]
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    key: process.env.GEMINI_API_KEY,
                }
            });
            geminiResult = response.data.candidates[0].content.parts[0].text.trim();
        }
        catch (error) {
            console.error('Error calling Gemini:', error.response?.data || error.message);
            throw new Error('Failed to get question from AI');
        }
        if (geminiResult === checkAnswerRequest.answer)
            return `${checkAnswerRequest.username} you are a genius`;
        else
            return `${checkAnswerRequest.username} you failed`;
    }
}
exports.default = CorrectAnswerService;
