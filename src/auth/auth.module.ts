import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  imports: [JwtModule.register({
    secret: 'process.env.JWT_SECRET',
    signOptions: { expiresIn: '40d' },
  }),UserModule],
})
export class AuthModule {}
