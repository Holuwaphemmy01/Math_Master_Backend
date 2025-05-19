import LoginRequest from "../data/dto/request/LoginRequest";
import LoginResponse from "../data/dto/response/LoginResponse";
import { AppDataSource } from "../data-source";
import UserRepository from "../repository/UserRepository";
import { User } from "../data/model/User";
import BcryptPassword from "../util/BcryptPassword";





export default class LoginService{
    private userRepository: UserRepository;
    private existingUser: User;
    private password: BcryptPassword;
    private response: LoginResponse;
    
    

    constructor(){
        this.userRepository = new UserRepository(AppDataSource.getRepository(User));
        this.existingUser = new User();
        this.password = new BcryptPassword();
        this.response = new LoginResponse();
    }
    async login (loginDto: LoginRequest): Promise<LoginResponse>{
        if (!loginDto.username) throw new Error("Email or Username cannot be empty");
        if (!loginDto.password || loginDto.password.length < 6 )("Password must be at least 6 characters");

        if (loginDto.email) {
         const findByEmailResult = await this.userRepository.findByEmail(loginDto.email);
         if (!findByEmailResult || !this.password.verifyPassword(loginDto.password, findByEmailResult.password)) throw new Error("Invalid Credentials");
         this.response.username=findByEmailResult.username;
         this.response.passed=findByEmailResult.passed;
         this.response.failed=findByEmailResult.failed;
         return this.response;
        } 


        else {
            const findByUsernameResult = await this.userRepository.findByUsername(loginDto.username); 
            if (!findByUsernameResult || !this.password.verifyPassword(loginDto.password, findByUsernameResult.password)) throw new Error("Invalid Credentials");
                this.response.username=findByUsernameResult.username;
                this.response.passed=findByUsernameResult.passed;
                this.response.failed=findByUsernameResult.failed;
                return this.response;      
        }




    }
}