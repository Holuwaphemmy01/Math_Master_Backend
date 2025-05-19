import UserRepository from "../repository/UserRepository";
import RegisterRequest from "../data/dto/request/RegisterRequest";
import RegisterResponse from "../data/dto/response/RegisterResponse";
import { User } from "../data/model/User";
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

        if (!registerDto.firstName) throw new Error("First name is required");
        if (!registerDto.lastName) throw new Error("Last name is required");
        if (!registerDto.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) throw new Error("Invalid email format!");
        if (!registerDto.gender) throw new Error("Gender is required");
        if (!registerDto.password || registerDto.password.length < 8) throw new Error("Password must be at least 8 characters long.");
        if (!registerDto.username) throw new Error("Username is required");
        if(!registerDto.school) throw new Error("School is required");
        if(!registerDto.age || registerDto.age < 8) throw new Error("You must be at least 8 years");
        if(!registerDto.language) throw new Error("Local Language is required");
        
        if(await this.userRepo.findByUsername(registerDto.username)) throw new Error("username already exist");
        if(await this.userRepo.findByEmail(registerDto.email)) throw new Error("Email already exist");
        this.newUser.firstName = registerDto.firstName;
        this.newUser.lastName = registerDto.lastName;
        this.newUser.email = registerDto.email;
        this.newUser.gender = registerDto.gender;
        this.newUser.password = await this.password.hashPassword(registerDto.password);
        this.newUser.username = registerDto.username;
        this.newUser.age = registerDto.age;
        this.newUser.school = registerDto.school;
        this.newUser.language = registerDto.language;
        this.newUser.passed=0;
        this.newUser.failed=0;

        const response = await this.userRepo.create(this.newUser);  
        const result = await this.userRepo.getAll();
        console.log(result);

        this.registerResponse.id = response.id;
        this.registerResponse.email = response.email;
        this.registerResponse.gender = response.gender;
        this.registerResponse.firstName = response.firstName;
        this.registerResponse.lastName = response.lastName;
        this.registerResponse.username = response.username;

        return this.registerResponse;
    }
}