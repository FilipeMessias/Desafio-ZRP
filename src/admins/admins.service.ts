import { Admin, AdminDocument } from './entities/admin.entity';
import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async create(createAdminDto: CreateAdminDto) {
    createAdminDto.password = await this.hashPassword(createAdminDto.password);
    return new this.adminModel(createAdminDto).save();
  }

  findAll() {
    return this.adminModel.find().select('-password');
  }

  findOne(id: string) {
    return this.adminModel.findById(id).select('-password');
  }

  async findByEmail(email: string): Promise<AdminDocument | null> {
    return this.adminModel.findOne({ email }).exec();
  }

  update(id: string, updateAdminDto: UpdateAdminDto) {
    return this.adminModel
      .findByIdAndUpdate(
        {
          _id: id,
        },
        {
          $set: updateAdminDto,
        },
        {
          new: true,
        },
      )
      .exec();
  }

  remove(id: string) {
    return this.adminModel.deleteOne({
      _id: id,
    });
  }
  count() {
    return this.adminModel.count().exec();
  }
}
