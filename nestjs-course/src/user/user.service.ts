import { Injectable } from '@nestjs/common';
import { LoggerService } from './user.logger.js';

interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class UserService {
  constructor(private readonly logger: LoggerService) {}

  private users: User[] = [
    { id: 1, name: "John Doe", email: "johndoe@gemail.com"},
    { id: 2, name: "Janet Doe", email: "janetdoe@gemail.com"}
  ]

  findAllUsers(name: string = '') {
    this.logger.log("Finding All Users");
    return this.users.filter(user => user.name.toLowerCase().includes(name.toLowerCase()))
  }
}
