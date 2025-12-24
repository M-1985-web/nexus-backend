import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  
  async register(createAuthDto: CreateAuthDto) {
    const { password, email } = createAuthDto;

    // 1. Encriptar la contraseña (Hashing)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Aquí es donde luego llamaremos al Modelo de MongoDB
    // Por ahora, simulamos el éxito para probar
    console.log(`Registrando talento: ${email}`);
    console.log(`Password encriptada: ${hashedPassword}`);

    return {
      message: 'Talento procesado con éxito en el protocolo Nexus',
      user: { email, hashedPassword }
    };

    
  }




  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }
  findAll() {
    return `This action returns all auth`;
  }
  findOne(id: number) {
   return `This action returns a #${id} auth`;
  }
  update(id: number, updateAuthDto: UpdateAuthDto) {
   return `This action updates a #${id} auth`;
  }
  remove(id: number) {
   return `This action removes a #${id} auth`;
  }

}
/*




@Injectable()
export class AuthService {




}
*/