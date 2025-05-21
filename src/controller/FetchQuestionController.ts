

import FetchQuestionRequest from "../data/dto/request/FetchQuestionRequest";    
import FetchQuestionResponse from "../data/dto/response/FetchQuestionResponse";
import FetchQuestionService from "../service/FetchQuestionService";
import { Router, Request, Response } from 'express';


export default class LoginController{
    private fetchQuestionService: FetchQuestionService;
    public router:Router;

    constructor(){
        this.fetchQuestionService= new FetchQuestionService();
        this.router = Router();
        this.routes();
    }

    private routes(){
        this.router.post('/', this.question);
    }

    private question = async (request: Request, response: Response): Promise<void> => {
            try {
                const requestBody: FetchQuestionRequest = request.body;
                const responseBody: FetchQuestionResponse = await this.fetchQuestionService.questions(requestBody);
                
                response.status(200).json({
                    message: "Success",
                    data: responseBody
                });
            } catch (error) {
                console.error("Error in fetching question:", error);
                response.status(500).json({
                    message: "Fetch question failed",
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        };



}