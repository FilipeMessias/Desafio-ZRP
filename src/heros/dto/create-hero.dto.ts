import { IsNotEmpty, IsEnum } from 'class-validator';
import { ClassHero } from '../types/hero';
export class CreateHeroDto {
  @IsNotEmpty()
  name: string;
  avatar: string;
  @IsNotEmpty()
  @IsEnum(ClassHero)
  class: string;
  @IsNotEmpty()
  latitude: string;
  @IsNotEmpty()
  longetude: string;
  skills: number;
  force: number;
  description: string;
}
