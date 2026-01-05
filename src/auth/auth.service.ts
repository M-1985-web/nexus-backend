import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'; // NUEVO: Importación para tokens
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Talento } from './entities/auth.entity';
//import { Talento } from '../talento/schemas/talento.schema';


@Injectable()
export class AuthService {

  constructor(
    @InjectModel('Talento') private readonly talentoModel: Model<Talento>,
    private readonly jwtService: JwtService // MODIFICADO: Inyectamos JwtService para el login
  ) {}

  // --- MÉTODO DE REGISTRO (igual) ---
  async register(createAuthDto: CreateAuthDto) {
    const { password, email } = createAuthDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoTalento = new this.talentoModel({
      ...createAuthDto,
      password: hashedPassword
    });

    console.log(`Guardando talento en la matriz: ${email}`);
    return await nuevoTalento.save();
  }

  // --- MÉTODO: LOGIN CORREGIDO ---
  async login(email: string, pass: string) {
    const talento = await this.talentoModel.findOne({ email });

    if (!talento) {
      throw new UnauthorizedException('Credenciales no válidas en Nexus');
    }

    const isMatch = await bcrypt.compare(pass, talento.password);

    if (!isMatch) {
      throw new UnauthorizedException('Credenciales no válidas en Nexus');
    }

    const payload = { sub: talento._id, email: talento.email };

    // MODIFICADO: Devolvemos talentoId directamente para que el Frontend lo capture fácil
    return {
      access_token: await this.jwtService.signAsync(payload),
      talentoId: talento._id, // Esto es lo que el frontend busca específicamente
      email: talento.email
    };
  }

  // Métodos secundarios (se puede dejar o borrar pero de momento los dejo)
  findAll() { return `This action returns all auth`; }
  // Cambia number por string en estos métodos:
  findOne(id: string) {
    return this.talentoModel.findById(id);
  }

  update(id: string, updateAuthDto: UpdateAuthDto) {
    return this.talentoModel.findByIdAndUpdate(id, updateAuthDto, { new: true });
  }

  remove(id: string) {
    return this.talentoModel.findByIdAndDelete(id);
  }

  
}




