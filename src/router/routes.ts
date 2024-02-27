import express from 'express';
import { commentController } from '../controllers/commentController';
import { userController } from '../controllers/userController'
import {validationMiddleware} from "../middlewares/validation.middleware";
import {CreateUserDto} from "../dtos/createUser.dto";
import {UpdateUserDto} from "../dtos/updateUser.dto";

export const router = express.Router();


router.get('/user', userController.getAll);
router.post('/user', validationMiddleware<CreateUserDto>(CreateUserDto), userController.create);
router.get('/user/:userId', userController.getOne);
router.put('/user/:userId', validationMiddleware<UpdateUserDto>(UpdateUserDto), userController.update);
router.delete('/user/:userId', userController.remove);

router.get('/comments', commentController.getAllByUserId);
router.post('/comments', commentController.create);
router.get('/comments/:commentId', commentController.getOne);
router.put('/comments/:commentsId', commentController.update);
router.delete('/comments/:commentsId', commentController.remove);
