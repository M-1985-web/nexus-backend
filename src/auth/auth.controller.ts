import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar nuevo talento con hashing de seguridad' })
  register(@Body() createAuthDto: CreateAuthDto) {
    // Usamos el método register que tiene la lógica de Bcrypt
    return this.authService.register(createAuthDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los talentos (Solo para admin)' })
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un talento por ID' })
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar datos de un talento' })
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un talento del protocolo' })
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}