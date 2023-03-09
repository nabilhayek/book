import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateUserInput, Role, UpdateUserInput } from 'src/types/graphql';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { Roles } from 'src/auth/roles.decorator';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation('createUser')
  async create(@Args('createUserInput') createUserInput: CreateUserInput) {
    createUserInput.password = await bcrypt.hash(createUserInput.password, 10);
    return this.userService.create(createUserInput);
  }

  @Query('users')
  @Roles(Role.ADMIN)
  findAll() {
    return this.userService.findAll();
  }

  @Query('user')
  findOne(@Args('id') id: string) {
    return this.userService.findOne(id);
  }

  @Mutation('updateUser')
  update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation('removeUser')
  remove(@Args('id') id: string) {
    return this.userService.remove(id);
  }
}
