import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'; // Asegúrate de tener estas importaciones

export class LoginAuthDto {
  @ApiProperty({ example: 'intentoemail6@gmail.com' })
  @IsEmail({}, { message: 'El correo debe ser válido' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'tu_password_aqui' })
  @IsString()
  @IsNotEmpty()
  password: string;
}