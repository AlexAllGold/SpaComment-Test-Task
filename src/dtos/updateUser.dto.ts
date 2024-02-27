import { IsInt, IsNotEmpty } from 'class-validator';
import { CreateUserDto } from './createUser.dto';

export class UpdateUserDto extends CreateUserDto {
    @IsInt()
    @IsNotEmpty()
    id: number;

    constructor(body: UpdateUserDto) {
        super(body);
        this.id = body?.id;
    }
}