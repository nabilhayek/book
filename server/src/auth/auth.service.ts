import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserLoginResponse } from 'src/types/graphql';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne(username);

    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if (user && isPasswordMatching) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async generateAccessToken(user: UserLoginResponse) {
    const access_token = await this.jwtService.signAsync(
      { ...user, sub: user.id },
      { expiresIn: '15m', secret: process.env.ACCESS_TOKEN_SECRET },
    );

    return access_token;
  }

  async generateRefreshToken(user: UserLoginResponse) {
    const refresh_token = await this.jwtService.signAsync(
      { ...user, sub: user.id },
      { expiresIn: '7d', secret: process.env.REFRESH_TOKEN_SECRET },
    );

    const hashedRefreshToken = await bcrypt.hash(refresh_token, 10);
    await this.userService.update(user.id, {
      refresh_token: hashedRefreshToken,
    });

    return refresh_token;
  }

  async decodeAccessToken(token: string) {
    const decoded = await this.jwtService.verifyAsync(token, {
      secret: process.env.ACCESS_TOKEN_SECRET,
    });
    return decoded;
  }

  async login(user: UserLoginResponse) {
    const access_token = await this.generateAccessToken(user);
    const refresh_token = await this.generateRefreshToken(user);
    return {
      access_token,
      refresh_token,
      user,
    };
  }

  async refreshAccessToken(userId: string, refreshToken: string) {
    const user = await this.userService.findOne(userId);
    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.refresh_token,
    );
    if (isRefreshTokenMatching) {
      const access_token = await this.generateAccessToken(user);
      return { access_token };
    }
    return null;
  }
}
