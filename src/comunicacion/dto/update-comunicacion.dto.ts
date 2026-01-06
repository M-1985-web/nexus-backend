import { PartialType } from '@nestjs/swagger';
import { CreateComunicacionDto } from './create-comunicacion.dto';

export class UpdateComunicacionDto extends PartialType(CreateComunicacionDto) {}
