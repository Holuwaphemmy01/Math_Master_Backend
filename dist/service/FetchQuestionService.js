"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FetchQuestionResponse_1 = __importDefault(require("../data/dto/response/FetchQuestionResponse"));
const UserRepository_1 = __importDefault(require("../repository/UserRepository"));
const User_1 = require("../data/model/User");
const data_source_1 = require("../data-source");
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
class FetchQuestionService {
    constructor() {
        this.userRepository = new UserRepository_1.default(data_source_1.AppDataSource.getRepository(User_1.User));
        this.response = new FetchQuestionResponse_1.default;
    }
    async questions(questionDto) {
        if (!questionDto.username)
            throw new Error("Field cannot be empty");
        const dbResponse = await this.userRepository.findByUsername(questionDto.username);
        if (!dbResponse)
            throw new Error("User not found");
        let dbAge = dbResponse.age;
        //     const headers = {
        //     'Content-Type': 'application/json',
        //     'x-api-key': process.env.SENSAY_API_KEY,
        //     'x-api-version': '2025-03-25',
        //     };
        //     const body = {
        //         "message": `Generate a question for age ${dbAge}`,
        //     };
        //     const url = process.env.SENSAY_URL as string;
        //     try {
        //         const sensayResponse = await axios.post( 'https://api.sensay.io/v1/replicas/3377c28d-efa8-422b-8900-6acdb1a545d9/chat', body, {headers});
        //         console.log("This is the http status ")
        //         return this.response.question = sensayResponse.data.content;
        //     } catch (error) {
        //         const axiosError = error as AxiosError;
        //   if (axiosError.response) {
        //     console.error('Response Error:', axiosError.response.status, axiosError.message);
        //     throw new Error(`Server responded with status ${axiosError.response.status}`);
        //   } else if (axiosError.request) {
        //     console.error('No response from server:', axiosError.message);
        //     throw new Error('No response from AI service.');
        //   } else {
        //     console.error('Request setup failed:', axiosError.message);
        //     throw new Error('Failed to send request to AI service.');
        //   }
        // }
        const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
        const prompt = `
You are Math King Ade — a wise Nigerian math tutor who uses Yoruba proverbs and market logic.
Generate one simple math question for a ${dbAge}-year-old student.
Only return the question in symbols, not words. No word problems. 
Make the question be more like an exam. so the question should not be easy. 
`.trim();
        try {
            const response = await axios_1.default.post(url, {
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
exports.default = FetchQuestionService;
