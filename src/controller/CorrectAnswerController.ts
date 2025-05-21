import CorrectAnswerRequest from "../data/dto/request/CorrectAnswerRequest";
import CorrectAnswerService from "../service/CorrectAnswerService";
import { Router, Request, Response } from 'express';


export default class CorrectAnswerController{
    private correctAnswerService: CorrectAnswerService;

     public router: Router;

     constructor (){
        this.correctAnswerService = new CorrectAnswerService();
        this.router = Router();
        this.routes();
     }

     private routes(){
        this.router.post('/', this.correct);
     }

      private correct = async (request: Request, response: Response): Promise<void> =>{
            try {
                                const requestBody: CorrectAnswerRequest = request.body;
                                const responseBody = await this.correctAnswerService.checkAnswer(requestBody);
                                
                                response.status(200).json({
                                    message: "Success",
                                    data: responseBody
                                });
                            } catch (error) {
                                console.error("Error in checking answer:", error);
                                response.status(500).json({
                                    message: "Checking for answer failed",
                                    error: error instanceof Error ? error.message : 'Unknown error'
                                });
            }
      }
}