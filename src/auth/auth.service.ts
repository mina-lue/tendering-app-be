/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcrypt';

const ACCESS_TOKEN_EXPIRES_IN_SEC = 5 * 60 * 60;    // 5 hours in seconds
const REFRESH_TOKEN_EXPIRES_IN_SEC = 10 * 24 * 60 * 60; // 10 days in seconds

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);

    const payload = {
      username: user.email,
      // if you have an `id`, it’s better to put it here:
      sub: user.id,
    };

    // sign tokens
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: ACCESS_TOKEN_EXPIRES_IN_SEC,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_KEY,
      expiresIn: REFRESH_TOKEN_EXPIRES_IN_SEC,
    });

    // compute absolute expiry
    const expiresAt = Date.now() + ACCESS_TOKEN_EXPIRES_IN_SEC * 1000;

    return {
      user,
      backendTokens: {
        accessToken,
        refreshToken,
        // client can compare Date.now() to this to know when to refresh
        expiresAt,
      },
    };
  }

  async validateUser(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);
    if(!user?.approved){
      throw new UnauthorizedException('User not approved');
    }
    if (
      user &&
      (await compare(dto.password, user.password))
    ) {
      // strip out the password before returning
      const { password, ...safeUser } = user;
      return safeUser;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async refreshToken(tokenPayload: any) {
    // tokenPayload is what you decoded/validated from the incoming refresh token
    const payload = {
      username: tokenPayload.username,
      sub: tokenPayload.sub,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: ACCESS_TOKEN_EXPIRES_IN_SEC,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_KEY,
      expiresIn: REFRESH_TOKEN_EXPIRES_IN_SEC,
    });
    const expiresAt = Date.now() + ACCESS_TOKEN_EXPIRES_IN_SEC * 1000;

    return {
      accessToken,
      refreshToken,
      expiresAt,
    };
  }
}
