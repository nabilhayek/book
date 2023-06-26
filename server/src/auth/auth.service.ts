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
    const user = await this.userService.findOne({ email: username });

    if (!user) return null;

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
      { expiresIn: '1m', secret: 'secret' },
    );

    return access_token;
  }

  async generateRefreshToken(user: UserLoginResponse) {
    const refresh_token = await this.jwtService.signAsync(
      { ...user, sub: user.id },
      { expiresIn: '7d', secret: 'refresh' },
    );

    const hashedRefreshToken = await bcrypt.hash(refresh_token, 10);
    await this.userService.update(user.id, {
      refresh_token: hashedRefreshToken,
    });

    return refresh_token;
  }

  async decodeAccessToken(token: string) {
    console.log('token', token);
    const decoded = await this.jwtService.verifyAsync(token, {
      secret: 'secret',
    });
    return decoded;
  }

  async validateToken(token: string) {
    try {
      const decoded = await this.decodeAccessToken(token);
      const user = await this.userService.findOne({ id: decoded.id });

      if (!user) return { valid: false };
      return { valid: true };
    } catch (error) {
      return { valid: false };
    }
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
    const user = await this.userService.findOne({ id: userId });
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
