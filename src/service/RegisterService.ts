import UserRepository from "../repository/UserRepository";
import RegisterRequest from "../data/dto/request/RegisterRequest";
import RegisterResponse from "../data/dto/response/RegisterResponse";
import { User } from "../data/model/User";
import {randomInt} from "node:crypto";
import BcryptPassword from "../util/BcryptPassword";
import { AppDataSource } from "../data-source";


export default class RegisterService {
    private newUser: User;
    private password: BcryptPassword;
    private registerResponse: RegisterResponse;
    private userRepo: UserRepository;

    constructor() {
        this.newUser = new User();
        this.password = new BcryptPassword();
        this.registerResponse = new RegisterResponse();
        this.userRepo = new UserRepository(AppDataSource.getRepository(User));
    }

    async register(registerDto: RegisterRequest): Promise<RegisterResponse> {

        console.log(registerDto)

        if (!registerDto.firstName) throw new Error("First name is required");
        if (!registerDto.lastName) throw new Error("Last name is required");
        if (!registerDto.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) throw new Error("Invalid email format!");
        if (!registerDto.gender) throw new Error("Gender is required");
        if (!registerDto.password || registerDto.password.length < 8) throw new Error("Password must be at least 8 characters long.");
        if (!registerDto.username) throw new Error("Username is required");

        console.log(registerDto)


        this.newUser.firstName = registerDto.firstName;
        this.newUser.lastName = registerDto.lastName;
        this.newUser.email = registerDto.email;
        this.newUser.gender = registerDto.gender;
        this.newUser.id = randomInt(100000);
        this.newUser.password = await this.password.hashPassword(registerDto.password);
        this.newUser.username = registerDto.username;

        const response = await this.userRepo.create(this.newUser);  

        this.registerResponse.id = response.id;
        this.registerResponse.email = response.email;
        this.registerResponse.gender = response.gender;
        this.registerResponse.firstName = response.firstName;
        this.registerResponse.lastName = response.lastName;
        this.registerResponse.username = response.username;

        return this.registerResponse;
    }
}