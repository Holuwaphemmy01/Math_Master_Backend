import ExplainQuestionRequest from "../data/dto/request/ExplainQuestionRequest";
import ExplainQuestionService from "../service/ExplainQuestionService";
import { Router, Request, Response } from 'express';


export default class ExplainQuestionController {
    private explainQuestionService: ExplainQuestionService;
    public router: Router;

    constructor(){
        this.explainQuestionService = new ExplainQuestionService();
        this.router = Router();
        this.routes();
    }



    private routes(){
        this.router.post('/', this.explain);
    }

    private explain = async (request: Request, response: Response): Promise<void> => {
                try {
                    const requestBody: ExplainQuestionRequest = request.body;
                    const responseBody = await this.explainQuestionService.explain(requestBody);
                    
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