"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepository_1 = __importDefault(require("../repository/UserRepository"));
const RegisterResponse_1 = __importDefault(require("../data/dto/response/RegisterResponse"));
const User_1 = require("../data/model/User");
const BcryptPassword_1 = __importDefault(require("../util/BcryptPassword"));
const data_source_1 = require("../data-source");
class RegisterService {
    constructor() {
        this.newUser = new User_1.User();
        this.password = new BcryptPassword_1.default();
        this.registerResponse = new RegisterResponse_1.default();
        this.userRepo = new UserRepository_1.default(data_source_1.AppDataSource.getRepository(User_1.User));
    }
    async register(registerDto) {
        if (!registerDto.firstName)
            throw new Error("First name is required");
        if (!registerDto.lastName)
            throw new Error("Last name is required");
        if (!registerDto.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
            throw new Error("Invalid email format!");
        if (!registerDto.gender)
            throw new Error("Gender is required");
        if (!registerDto.password || registerDto.password.length < 8)
            throw new Error("Password must be at least 8 characters long.");
        if (!registerDto.username)
            throw new Error("Username is required");
        if (!registerDto.school)
            throw new Error("School is required");
        if (!registerDto.age || registerDto.age < 8)
            throw new Error("You must be at least 8 years");
        if (!registerDto.language)
            throw new Error("Local Language is required");
        if (await this.userRepo.findByUsername(registerDto.username))
            throw new Error("username already exist");
        if (await this.userRepo.findByEmail(registerDto.email))
            throw new Error("Email already exist");
        this.newUser.firstName = registerDto.firstName;
        this.newUser.lastName = registerDto.lastName;
        this.newUser.email = registerDto.email;
        this.newUser.gender = registerDto.gender;
        this.newUser.password = await this.password.hashPassword(registerDto.password);
        this.newUser.username = registerDto.username;
        this.newUser.age = registerDto.age;
        this.newUser.school = registerDto.school;
        this.newUser.language = registerDto.language;
        this.newUser.passed = 0;
        this.newUser.failed = 0;
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
exports.default = RegisterService;
