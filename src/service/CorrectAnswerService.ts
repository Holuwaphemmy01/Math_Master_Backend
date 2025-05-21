import axios from "axios";
import CorrectAnswerRequest from "../data/dto/request/CorrectAnswerRequest";
import UserRepository from "../repository/UserRepository";
import { AppDataSource } from "../data-source";
import { User } from "../data/model/User";

export default class CorrectAnswerService{
    private userRepository: UserRepository;
    
         constructor(){
            this.userRepository = new UserRepository(AppDataSource.getRepository(User));    
        }

    async checkAnswer(checkAnswerRequest: CorrectAnswerRequest): Promise<string>{
        const dbResponse = await this.userRepository.findByUsername(checkAnswerRequest.username);
        if(!dbResponse) throw new Error("User does not exist");
        const age = dbResponse.age;

        const prompt = `
You are Math King Ade — a wise Nigerian math tutor who uses .
A student named "${checkAnswerRequest.username}" aged ${age} is asking this math question: "${checkAnswerRequest.question}"
They answered: "${checkAnswerRequest.answer}"

Check if the answer is correct.
Respond only with:
- 'true' or 'false' as the first word (always in English)
- If true: Compliment them by name in English."
- If false: Explain how to solve it correctly in ${dbResponse.language}, using Lagos markets, farming, or everyday life examples.
Do NOT repeat the question or answer.
Make sure that only the first word is in English (true/false), and the rest of the response is entirely in ${dbResponse.language}.
`.trim();

        try {
      const response = await axios.post(
       'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
        {
          contents: [
            {
              parts: [{ text: prompt }],
              role: 'user'
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          params: {
            key: process.env.GEMINI_API_KEY,
          }
        }
      );

      return response.data.candidates[0].content.parts[0].text.trim();
    } catch (error: any) {
      console.error('Error calling Gemini:', error.response?.data || error.message);
      throw new Error('Failed to get question from AI');
    }
  }
       
    

}