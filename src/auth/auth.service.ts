import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(username);
    if (user) {
      const isMatch = await bcrypt.compare(pass, user.password);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return isMatch ? result : null;
    }
    return null;
  }

  async login(user: any) {
    const payload = { id: user.id, type: user.userType };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
