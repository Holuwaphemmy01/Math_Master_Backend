import * as bcrypt from 'bcrypt';

export default class BcryptPassword {
  async hashPassword(password: string | undefined): Promise<string> {
    if (!password) throw new Error('Password is required');
    return bcrypt.hash(password, 10);
  }

  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
