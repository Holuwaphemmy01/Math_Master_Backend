import { Repository } from 'typeorm';
import {User} from "../data/model/User";

export default class UserRepository {
    constructor(private readonly repository: Repository<User>) {}

    async create(user: User): Promise<User> {
        return this.repository.save(user);
    }

    async findByUsername(username: string): Promise<User | null> {
    return this.repository.findOne({ where: { username } });
    }

    async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
    }

    async getAll(): Promise<User[]> {
    return this.repository.find();
    }

}