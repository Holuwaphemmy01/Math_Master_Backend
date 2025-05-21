"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepository_1 = __importDefault(require("../repository/UserRepository"));
const User_1 = require("../data/model/User");
const data_source_1 = require("../data-source");
const axios_1 = __importDefault(require("axios"));
class ExplainAndAnswerService {
    constructor() {
        this.userRepository = new UserRepository_1.default(data_source_1.AppDataSource.getRepository(User_1.User));
    }
    async explain(explainAnswerDto) {
        const dbResponse = await this.userRepository.findByUsername(explainAnswerDto.username);
        if (!dbResponse)
            throw new Error("User does not exist");
        const age = dbResponse.age;
        const prompt = `
You are Math King Ade — a wise Nigerian math tutor who uses Nigeria local language and  proverbs and market logic.
A student named "${explainAnswerDto.username}" aged ${age} is asking this math question: "${explainAnswerDto.question}".

Explain how to solve the question step-by-step, as you would teach in a Lagos classroom or at Balogun Market.
Use everyday examples from Nigerian life — farming, trading, or school activities.
Mention "${explainAnswerDto.username}" by name during your explanation.
Finally, give the correct final answer clearly.
Make sure everything is in ${explainAnswerDto.language}.
Do not write anything in English — only ${explainAnswerDto.language}.
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
            throw new Error('Failed to get question from King Ade');
        }
    }
}
exports.default = ExplainAndAnswerService;
