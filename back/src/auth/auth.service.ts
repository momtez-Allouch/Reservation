import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service/prisma.service';
import { SupabaseService } from 'src/supabase.service/supabase.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly supabaseService: SupabaseService,
  ) {}

  async signUp(userData: User) {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase.auth.signUp({
      email: userData.email as string,
      password: userData.password as string,
    });

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async signIn(email: string, password: string) {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
}
