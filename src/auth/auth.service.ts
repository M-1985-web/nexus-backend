import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto'; // Verifica que este archivo exista
import { Talento } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  // 1. INYECCIÓN DEL MODELO: Esto quita el error de "talentoModel"
  constructor(
    @InjectModel('Talento') private readonly talentoModel: Model<Talento>
  ) {}

  async register(createAuthDto: CreateAuthDto) {
    const { password, email } = createAuthDto;

    // 2. Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Crear y guardar el documento
    // Eliminamos el return falso que tenías antes para que llegue aquí
    const nuevoTalento = new this.talentoModel({
      ...createAuthDto,
      password: hashedPassword
    });

    console.log(`Guardando talento en la matriz: ${email}`);
    
    // 4. RETORNO REAL: Esto enviará el _id al frontend
    return await nuevoTalento.save();
  }

  // Si no usas estos métodos, puedes borrarlos para limpiar errores
  findAll() { return `This action returns all auth`; }
  findOne(id: number) { return `This action returns a #${id} auth`; }
  
  // Si te sigue dando error en UpdateAuthDto, asegúrate de tener el archivo en ./dto/
  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) { return `This action removes a #${id} auth`; }
}
/*




@Injectable()
export class AuthService {




}
*/