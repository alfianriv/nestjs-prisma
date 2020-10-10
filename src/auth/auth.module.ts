import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { HandleService } from 'src/helper/handle/handle.service';
import { HashService } from 'src/helper/hash/hash.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }), 
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '30d' }
    })
  ],
  controllers: [AuthController,],
  providers: [AuthService, PrismaService, HandleService, HashService, JwtStrategy],
  exports: [PassportModule, JwtModule]
})
export class AuthModule { }
