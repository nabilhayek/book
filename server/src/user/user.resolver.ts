import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {
  CreateUserInput,
  Role,
  UpdateUserInput,
  FindOneUserInput,
} from 'src/types/graphql';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { Roles } from 'src/auth/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation('createUser')
  async create(@Args('createUserInput') createUserInput: CreateUserInput) {
    createUserInput.password = await bcrypt.hash(createUserInput.password, 10);
    return this.userService.create(createUserInput);
  }

  @Query('users')
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Query('user')
  @UseGuards(JwtAuthGuard)
  findOne(@Args('findOneUserInput') findOneUserInput: FindOneUserInput) {
    return this.userService.findOne(findOneUserInput);
  }

  @Mutation('updateUser')
  @UseGuards(JwtAuthGuard)
  update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation('removeUser')
  @Roles(Role.ADMIN)
  remove(@Args('id') id: string) {
    return this.userService.remove(id);
  }
}
