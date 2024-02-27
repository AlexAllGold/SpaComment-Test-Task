import { Repository } from 'typeorm';
import { Database } from '../config/database';
import { CreateUserDto } from '../dtos/createUser.dto';
import { UserEntity } from '../entities/user.entity';
// import { BadRequestException } from '../utils/exceptions/BadRequestException';
import { UpdateUserDto } from '../dtos/updateUser.dto';

class UserService {
    userRepository: Repository<UserEntity>;

    constructor() {
        this.userRepository = Database.dataSource.getRepository(UserEntity);
    }

    async getAll(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async getOne(id: number): Promise<UserEntity> {
        const user: UserEntity | null = await this.userRepository.findOneBy({ id });
        if (user) {
            return user;
        }
        // throw new BadRequestException('Can not find this user!');
        throw new Error('Can not find this user!');
    }

    async create(dto: CreateUserDto): Promise<UserEntity> {
        return this.userRepository.save(dto);
    }

    async update(id: number, dto: UpdateUserDto): Promise<UserEntity> {
        if (id !== Number(dto.id)) {
            // throw new BadRequestException('Id User does not match');
            throw new Error('Id User does not match');
        }
        const user: UserEntity = await this.getOne(id);
        this.userRepository.merge(user, dto);
        return this.userRepository.save(user);
    }

    async remove(id: number): Promise<void> {
        await this.getOne(id);
        await this.userRepository.delete(id);
    }
}

export const userService: UserService = new UserService();