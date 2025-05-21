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
Solve this math question and return only the final numerical answer.
Do not include any explanation, words, or markdown.
Question: "${checkAnswerRequest.question}"
Answer:
`.trim();

        let geminiResult = "";

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
     geminiResult = response.data.candidates[0].content.parts[0].text.trim();
    } catch (error: any) {
      console.error('Error calling Gemini:', error.response?.data || error.message);
      throw new Error('Failed to get question from AI');
    }

    if(geminiResult===checkAnswerRequest.answer) return `${checkAnswerRequest.username} you are a genius`;
    else return `${checkAnswerRequest.username} you failed`;

  }


       
    

}