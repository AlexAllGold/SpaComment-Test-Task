import { Request, Response } from 'express';
import { userService } from '../services/userService';
import { UpdateUserDto } from '../dtos/updateUser.dto';
import { CreateUserDto } from '../dtos/createUser.dto';
import { UserEntity } from '../entities/user.entity';

class UserControllers {
    async getAll(_req: Request, res: Response): Promise<void> {
        const user: UserEntity[] = await userService.getAll();
        res.status(200).json(user);
    }

    async getOne(req: Request, res: Response): Promise<void> {
        const user: UserEntity = await userService.getOne(Number(req.params.userId));
        res.status(200).json(user);
    }

    async create(req: Request, res: Response): Promise<void> {
        const user: UserEntity = await userService.create(req.body as CreateUserDto);
        res.status(201).json(user);
    }

    async update(req: Request, res: Response): Promise<void> {
        const user: UserEntity = await userService.update(Number(req.params.userId), req.body as UpdateUserDto);
        res.status(203).json(user);
    }

    async remove(req: Request, res: Response): Promise<void> {
        await userService.remove(Number(req.params.userId));
        res.status(204).end();
    }
}

export const userController: UserControllers = new UserControllers();