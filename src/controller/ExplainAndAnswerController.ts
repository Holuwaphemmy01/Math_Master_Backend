
import ExplainAndAnswerRequest from "../data/dto/request/ExplainAndAnswerRequest";
import ExplainAndAnswerService from "../service/ExplainAndAnswerService";
import { Router, Request, Response } from 'express';


export default class ExplainQuestionController {
    private explainAndAnswerService: ExplainAndAnswerService;
    public router: Router;

    constructor(){
        this.explainAndAnswerService = new ExplainAndAnswerService();
        this.router = Router();
        this.routes();
    }



    private routes(){
        this.router.post('/', this.explain);
    }

    private explain = async (request: Request, response: Response): Promise<void> => {
                try {
                    const requestBody: ExplainAndAnswerRequest = request.body;
                    const responseBody = await this.explainAndAnswerService.explain(requestBody);
                    
                    response.status(200).json({
                        message: "Success",
                        data: responseBody
                    });
                } catch (error) {
                    console.error("Error in explaining question:", error);
                    response.status(500).json({
                        message: "Explain question failed",
                        error: error instanceof Error ? error.message : 'Unknown error'
                    });
                }
            };

            
    
    
    





}