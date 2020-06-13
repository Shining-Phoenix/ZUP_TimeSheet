import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { configModule } from '../configure.root';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
    configModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
