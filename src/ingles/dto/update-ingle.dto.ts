import { PartialType } from '@nestjs/swagger';
import { CreateIngleDto } from './create-ingle.dto';

export class UpdateIngleDto extends PartialType(CreateIngleDto) {}
