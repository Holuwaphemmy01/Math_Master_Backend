"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LoginResponse_1 = __importDefault(require("../data/dto/response/LoginResponse"));
const data_source_1 = require("../data-source");
const UserRepository_1 = __importDefault(require("../repository/UserRepository"));
const User_1 = require("../data/model/User");
const BcryptPassword_1 = __importDefault(require("../util/BcryptPassword"));
class LoginService {
    constructor() {
        this.userRepository = new UserRepository_1.default(data_source_1.AppDataSource.getRepository(User_1.User));
        this.existingUser = new User_1.User();
        this.password = new BcryptPassword_1.default();
        this.response = new LoginResponse_1.default();
    }
    async login(loginDto) {
        if (!loginDto.username)
            throw new Error("Email or Username cannot be empty");
        if (!loginDto.password || loginDto.password.length < 6)
            ("Password must be at least 6 characters");
        if (loginDto.email) {
            const findByEmailResult = await this.userRepository.findByEmail(loginDto.email);
            if (!findByEmailResult || !this.password.verifyPassword(loginDto.password, findByEmailResult.password))
                throw new Error("Invalid Credentials");
            this.response.username = findByEmailResult.username;
            this.response.passed = findByEmailResult.passed;
            this.response.failed = findByEmailResult.failed;
            return this.response;
        }
        else {
            const findByUsernameResult = await this.userRepository.findByUsername(loginDto.username);
            if (!findByUsernameResult || !this.password.verifyPassword(loginDto.password, findByUsernameResult.password))
                throw new Error("Invalid Credentials");
            this.response.username = findByUsernameResult.username;
            this.response.passed = findByUsernameResult.passed;
            this.response.failed = findByUsernameResult.failed;
            return this.response;
        }
    }
}
exports.default = LoginService;
