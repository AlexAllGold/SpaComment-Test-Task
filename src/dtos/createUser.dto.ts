import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 50, { message: 'The name must have from 4 to 50 characters' })
    name: string;

  @IsEmail()
  @IsNotEmpty()
    email: string;

  constructor(body: CreateUserDto) {
    this.name = body?.name;
    this.email = body?.email;
  }
}
