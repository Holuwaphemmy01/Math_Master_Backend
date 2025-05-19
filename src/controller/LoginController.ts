import LoginRequest from "../data/dto/request/LoginRequest";
import LoginResponse from "../data/dto/response/LoginResponse";
import LoginService from "../service/LoginService";
import { Router, Request, Response } from 'express';


export default class LoginController{
    private loginService:LoginService;
    public router:Router;

    constructor(){
        this.loginService = new LoginService();
        this.router = Router();
        this.routes();
    }

    private routes(){
        this.router.post('/', this.login);
    }

    private login = async (request: Request, response: Response): Promise<void> => {
            try {
                const requestBody: LoginRequest = request.body;
                const responseBody: LoginResponse = await this.loginService.login(requestBody);
                
                response.status(200).json({
                    message: "Login successfully",
                    data: responseBody
                });
            } catch (error) {
                console.error("Error in login:", error);
                response.status(500).json({
                    message: "Login failed",
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        };



}