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

  // --- NUEVO MÉTODO: LOGIN ---
  async login(email: string, pass: string) {
    // 1. Buscamos el talento en Atlas por email
    const talento = await this.talentoModel.findOne({ email });

    // 2. Si no existe, lanzamos error de seguridad
    if (!talento) {
      throw new UnauthorizedException('Credenciales no válidas en Nexus');
    }

    // 3. Comparamos contraseña plana vs encriptada (bcrypt)
    const isMatch = await bcrypt.compare(pass, talento.password);

    if (!isMatch) {
      throw new UnauthorizedException('Credenciales no válidas en Nexus');
    }

    // 4. Generamos el Token de acceso si todo es correcto
    const payload = { sub: talento._id, email: talento.email };
    
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: talento._id,
        email: talento.email
      }
    };
  }

  // Métodos secundarios (se puede dejar o borrar pero de momento los dejo)
  findAll() { return `This action returns all auth`; }
  findOne(id: number) { return `This action returns a #${id} auth`; }
  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }
  remove(id: number) { return `This action removes a #${id} auth`; }

  
}




