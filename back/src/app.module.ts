import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ReservationModule } from './reservation/reservation.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [UserModule, ReservationModule, AuthModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
