import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UserService } from './user.service.js';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(@Query('name') name: string): unknown {
    return this.userService.findAllUsers()
  }

  @Get(":id")
  getUserById(@Param("id") id: string): unknown {
    return this.userService.getUserById(Number(id))
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): unknown {
    return this.userService.createUser(createUserDto)
  }

  @Put("id")
  updateUser(@Param("id") id: string, @Body() updatedUserDto: UpdateUserDto): unknown {
    return this.userService.updateUser(Number(id), updatedUserDto);
  }
}
