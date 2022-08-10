import { Module } from '@nestjs/common';
import { AdminsModule } from './admins/admins.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HerosModule } from './heros/heros.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URL ||
        'mongodb+srv://zrp:zrp@cluster0.ue2orhn.mongodb.net/test',
    ),
    AdminsModule,
    HerosModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
