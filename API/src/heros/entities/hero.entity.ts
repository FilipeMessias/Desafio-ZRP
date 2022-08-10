import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ClassHero } from '../types/hero';

export type HeroDocument = Hero & Document;

@Schema()
export class Hero {
  @Prop({ required: true })
  name: string;

  @Prop()
  avatar: string;

  @Prop({ required: true, enum: ClassHero })
  class: ClassHero;

  @Prop({ required: true })
  latitude: string;

  @Prop({ required: true })
  longetude: string;

  @Prop()
  skills: number;

  @Prop()
  force: number;

  @Prop()
  description: string;
}

export const HeroSchema = SchemaFactory.createForClass(Hero);
