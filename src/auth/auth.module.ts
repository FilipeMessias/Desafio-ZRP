import { JwtStrategy } from './auth/guards/jwt.strategy';
import { JwtGuard } from './auth/guards/jwt.guard';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from 'src/admins/entities/admin.entity';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'zrpgafsfce8745fejshfcgsdhvbhdb',
      signOptions: {
        expiresIn: '3600s',
      },
    }),
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtGuard, JwtStrategy],
})
export class AuthModule {}
