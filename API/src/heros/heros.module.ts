import { Module } from '@nestjs/common';
import { HerosService } from './heros.service';
import { HerosController } from './heros.controller';
import { Hero, HeroSchema } from './entities/hero.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Hero.name, schema: HeroSchema }]),
  ],
  controllers: [HerosController],
  providers: [HerosService],
})
export class HerosModule {}
