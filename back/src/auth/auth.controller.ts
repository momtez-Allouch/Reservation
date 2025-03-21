import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signup')
  async signUp(@Body() body: User) {
    const signupUser = await this.authService.signUp(body);
    await this.userService.create({ ...body, role: 'customer' });
    return signupUser;
  }

  @Post('signin')
  async signIn(@Body() body: { email: string; password: string }) {
    return this.authService.signIn(body.email, body.password);
  }
}
