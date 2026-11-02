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
  getUserById(@Param("id") id: number) {
    this.userService.getUserById(id)
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return { data: createUserDto, message: "User Created Successfully"}
  }

  @Put("id")
  updateUser(@Param("id") id: string, @Body() updatedUserDto: UpdateUserDto) {
    return {
      data: {id, ...updatedUserDto},
      message: "User Updated Successfully"
    }
  }
}
