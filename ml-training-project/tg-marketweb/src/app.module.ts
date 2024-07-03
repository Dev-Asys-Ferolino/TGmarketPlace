import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { VendorModule } from './vendor/vendor.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, AuthModule, VendorModule, CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
