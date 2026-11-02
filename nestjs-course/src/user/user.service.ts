import { Injectable } from '@nestjs/common';
import { LoggerService } from './user.logger.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class UserService {
  constructor(private readonly logger: LoggerService) {}

  private users: User[] = [
    { id: 1, name: 'John Doe', email: 'johndoe@gemail.com' },
    { id: 2, name: 'Janet Doe', email: 'janetdoe@gemail.com' },
  ];

  findAllUsers(name: string = '') {
    this.logger.log('Finding All Users');
    return this.users.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  getUserById(id: number) {
    this.logger.log('Getting a user by Id');
    return this.users.filter((user) => id === user.id) ?? null;
  }

  createUser(dto: CreateUserDto) {
    this.logger.log('Creating User');

    const newUser: User = { id: this.users.length + 1, ...dto };
    this.users.push(newUser);

    return newUser;
  }

  updateUser(id: number, dto: UpdateUserDto) {
    this.logger.log('Updating User');

    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return null;

    this.users[index] = { ...this.users[index], ...dto };

    return this.users[index];
  }

  deleteUser(id: number) {
    this.logger.log('Deleting a user');
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return null;

    const [deleted] = this.users.splice(index, 1);

    return deleted;
  }
}
