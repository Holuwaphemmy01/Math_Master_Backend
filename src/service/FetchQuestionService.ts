import FetchQuestionRequest from "../data/dto/request/FetchQuestionRequest";
import FetchQuestionResponse from "../data/dto/response/FetchQuestionResponse";
import UserRepository from "../repository/UserRepository";
import { User } from "../data/model/User";
import { AppDataSource } from "../data-source";
import dotenv from 'dotenv'
import axios, { AxiosError } from 'axios';








dotenv.config();
export default class FetchQuestionService{

    private userRepository: UserRepository;
    

    constructor(){
        this.userRepository = new UserRepository(AppDataSource.getRepository(User));
    }
    
    async questions(questionDto: FetchQuestionRequest): Promise<FetchQuestionResponse>{
        if(!questionDto.username) throw new Error("Field cannot be empty");
        const dbResponse = await this.userRepository.findByUsername(questionDto.username);
        if(!dbResponse)throw new Error("User not found");

        let dbAge = dbResponse.age;

        const headers = {
            'x-api-key': process.env.SENSAY_KEY,
            'Content-Type': 'application/json'
          
        };

        const body = {
            message: `Generate a question for age ${dbAge}`
        };


        const url = process.env.SENSAY_URL as string;

        try {
            console.log("API URL:", process.env.SENSAY_URL);
            const response = await axios.post(url, body, { headers });
             return response.data.content || 'No answer received.';
            
        } catch (error) {
            const axiosError = error as AxiosError;

      if (axiosError.response) {
        console.error('Response Error:', axiosError.response.status, axiosError.message);
        throw new Error(`Server responded with status ${axiosError.response.status}`);
      } else if (axiosError.request) {
        console.error('No response from server:', axiosError.message);
        throw new Error('No response from AI service.');
      } else {
        console.error('Request setup failed:', axiosError.message);
        throw new Error('Failed to send request to AI service.');
      }
    }

        

    
    }

}