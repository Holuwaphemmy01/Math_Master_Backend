
import ExplainAndAnswerRequest from '../data/dto/request/ExplainAndAnswerRequest';
import UserRepository from '../repository/UserRepository';
import { User } from "../data/model/User";
import { AppDataSource } from "../data-source";
import axios from 'axios';



export default class ExplainQuestionService{
     private userRepository: UserRepository;

     constructor(){
        this.userRepository = new UserRepository(AppDataSource.getRepository(User));    
    }

    async explain(explainAnswerDto: ExplainAndAnswerRequest): Promise<string>{

        const dbResponse = await this.userRepository.findByUsername(explainAnswerDto.username);
        if(!dbResponse) throw new Error("User does not exist");
        const age = dbResponse.age;
        const prompt = `
You are Math King Ade — a wise Nigerian math tutor who uses Nigeria local language and  proverbs and market logic.
A student named "${explainAnswerDto.username}" aged ${age} is asking this math question: "${explainAnswerDto.question}".

Explain how to solve the question step-by-step, as you would teach in a Lagos classroom or at Balogun Market.
Use everyday examples from Nigerian life — farming, trading, or school activities.
Mention "${explainAnswerDto.username}" by name during your explanation.
Finally, give the correct final answer clearly.
Make sure everything is in ${dbResponse.language}.
Do not write anything in English — only ${dbResponse.language}.
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