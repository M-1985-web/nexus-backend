import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LoginAuthDto } from './dto/login-auth.dto'; // Importación correcta del DTO

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar nuevo talento con hashing de seguridad' })
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  // NUEVO: Ruta de Login para el Protocolo Nexus
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión y obtener Token de acceso (JWT)' })
  // MODIFICADO: Cambiamos 'any' por 'LoginAuthDto' para que Swagger muestre el Request Body
  async login(@Body() loginDto: LoginAuthDto) { 
    // Ahora Swagger reconocerá loginDto.email y loginDto.password gracias al DTO
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los talentos (Solo para admin)' })
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un talento por ID' })
  findOne(@Param('id') id: string) {
    // Nota: Si usas IDs de MongoDB, el '+' (conversión a número) podría fallar. 
    // Si tu findOne acepta string, quita el '+'.
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