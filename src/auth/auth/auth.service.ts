import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from 'src/admins/entities/admin.entity';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private jwtService: JwtService,
  ) {}

  async auth(authDto: AuthDto) {
    const admin = await this.checkAdmin(authDto.email, authDto.password);

    if (!admin) return null;

    const payload = {
      sub: admin._id,
      email: admin.email,
      name: admin.name,
    };

    return this.jwtService.sign(payload);
  }

  async doesPasswordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async checkAdmin(email: string, password: string) {
    const admin = await this.adminModel.findOne({ email }).exec();
    const doesAdminExist = !!admin;

    if (!doesAdminExist) return null;

    const doesPasswordMatch = await this.doesPasswordMatch(
      password,
      admin.password,
    );

    if (!doesPasswordMatch) return null;

    return admin;
  }
}
