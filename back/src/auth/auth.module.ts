import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service/prisma.service';
import { SupabaseService } from 'src/supabase.service/supabase.service';

@Module({
  providers: [AuthService, PrismaService, SupabaseService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
