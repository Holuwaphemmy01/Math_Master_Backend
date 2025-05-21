"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async create(user) {
        return this.repository.save(user);
    }
    async findByUsername(username) {
        return this.repository.findOne({ where: { username } });
    }
    async findByEmail(email) {
        return this.repository.findOne({ where: { email } });
    }
    async getAll() {
        return this.repository.find();
    }
}
exports.default = UserRepository;
