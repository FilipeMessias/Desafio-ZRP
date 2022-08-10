import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { HerosService } from './heros.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { JwtGuard } from 'src/auth/auth/guards/jwt.guard';
import { Request } from 'express';
@Controller('heros')
export class HerosController {
  constructor(private readonly herosService: HerosService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createHeroDto: CreateHeroDto) {
    return this.herosService.create(createHeroDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  async findAll(@Req() req: Request) {
    const query = this.herosService.findAll();

    const page: number = parseInt(req.query.page as any) || 1;
    const limit = parseInt(req.query.limit as any) || 10;
    const total = await this.herosService.count();

    const data = await query
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return {
      data,
      total,
      page,
      last_page: Math.ceil(total / limit),
    };
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.herosService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHeroDto: UpdateHeroDto) {
    return this.herosService.update(id, updateHeroDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.herosService.remove(id);
  }
}
