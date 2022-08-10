import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { Hero, HeroDocument } from './entities/hero.entity';

@Injectable()
export class HerosService {
  constructor(@InjectModel(Hero.name) private heroModel: Model<HeroDocument>) {}

  create(createHeroDto: CreateHeroDto) {
    return new this.heroModel(createHeroDto).save();
  }

  findAll() {
    return this.heroModel.find();
  }

  findOne(id: string) {
    return this.heroModel.findById(id);
  }

  update(id: string, updateHeroDto: UpdateHeroDto) {
    return this.heroModel
      .findByIdAndUpdate(
        {
          _id: id,
        },
        {
          $set: updateHeroDto,
        },
        {
          new: true,
        },
      )
      .exec();
  }

  remove(id: string) {
    return this.heroModel.deleteOne({
      _id: id,
    });
  }

  count() {
    return this.heroModel.count().exec();
  }
}
