import { Repository } from 'typeorm';
import {User} from "../data/model/User"

export default class UserRepository {
    constructor(private readonly repository: Repository<User>) {}

    async create(user: User): Promise<User> {
        return this.repository.save(user);
    }
}