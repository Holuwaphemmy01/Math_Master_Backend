"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepository_1 = __importDefault(require("../repository/UserRepository"));
const User_1 = require("../data/model/User");
const data_source_1 = require("../data-source");
const axios_1 = __importDefault(require("axios"));
class ExplainQuestionService {
    constructor() {
        this.userRepository = new UserRepository_1.default(data_source_1.AppDataSource.getRepository(User_1.User));
    }
    async explain(explainQuestionDto) {
        const dbResponse = await this.userRepository.findByUsername(explainQuestionDto.username);
        if (!dbResponse)
            throw new Error("User does not exist");
        const age = dbResponse.age;
        const prompt = `
You are Math King Ade — a wise Nigerian math tutor who uses Yoruba proverbs and market logic.
A student named "${explainQuestionDto.username}" aged ${age} is asking this math question: "${explainQuestionDto.question}".
Explain the question step-by-step like a real teacher, in the language: ${dbResponse.language}.
Use examples from Lagos markets, farming, or everyday life that "${explainQuestionDto.username}" will understand.
Include their name in your response.
Make sure to respond only in ${dbResponse.language}.
The explanation does not include the answer.
`.trim();
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
            return response.data.candidates[0].content.parts[0].text.trim();
        }
        catch (error) {
            console.error('Error calling Gemini:', error.response?.data || error.message);
            throw new Error('Failed to get question from AI');
        }
    }
}
exports.default = ExplainQuestionService;
