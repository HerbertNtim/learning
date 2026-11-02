import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto.js';
import { UpdateUserDto } from './update-user.dto.js';

@Controller('user')
export class UserController {
  @Get()
  getUsers(@Query('name') name: string) {
    const users = [
      {id: 1, name: name ?? "Herbert"},
      {id: 2, name: "Ntim"},
    ]

    if(name) {
      return users.filter(user => user.name.toLowerCase().includes(name.toLowerCase()))
    }

    return users
  }

  @Get(":id")
  getUserById(@Param("id") id: string) {
    return {id, name: "Herbert Ntim"}
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
