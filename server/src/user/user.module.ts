import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [UserResolver, UserService],
  exports: [UserService],
  imports: [forwardRef(() => AuthModule)],
})
export class UserModule {}
