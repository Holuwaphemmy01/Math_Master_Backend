
import RegisterRequest from "../data/dto/request/RegisterRequest";
import RegisterResponse from "../data/dto/response/RegisterResponse";
import RegisterService from "../service/RegisterService";
import { Router, Request, Response } from 'express';

export default class RegisterController {
    private registerService: RegisterService = new RegisterService();
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes() {
        this.router.post('/', this.register);
    }

    private register = async (request: Request, response: Response): Promise<void> => {
        try {
            const requestBody: RegisterRequest = request.body;
            const responseBody: RegisterResponse = await this.registerService.register(requestBody);
            
            response.status(201).json({
                message: "User created successfully",
                data: responseBody
            });
        } catch (error) {
            console.error("Error in register:", error);
            response.status(500).json({
                message: "Registration failed",
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };
}
