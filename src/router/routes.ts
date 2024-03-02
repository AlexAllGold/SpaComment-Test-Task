import express from 'express';
import { commentController } from '../controllers/commentController';
import { userController } from '../controllers/userController';
import { validationMiddleware } from '../middlewares/validation.middleware';
import { CreateUserDto } from '../dtos/createUser.dto';
import { UpdateUserDto } from '../dtos/updateUser.dto';
import { wrapperController } from '../utils/wrapperController';
import { CreateCommentDto } from '../dtos/createComment.dto';
import { UpdateCommentDto } from '../dtos/updateComment.dto';

export const router = express.Router();

router.get('/user', wrapperController(userController.getAll));
router.post('/user', validationMiddleware<CreateUserDto>(CreateUserDto), wrapperController(userController.create));
router.get('/user/:userId', wrapperController(userController.getOne));
router.put('/user/:userId', validationMiddleware<UpdateUserDto>(UpdateUserDto), wrapperController(userController.update));
router.delete('/user/:userId', wrapperController(userController.remove));

router.get('/user/:userId/comments', wrapperController(commentController.getAllByUserId));
router.post('/user/:userId/comments', validationMiddleware<CreateCommentDto>(CreateCommentDto), wrapperController(commentController.create));
router.get('/user/:userId/comments/:commentId', wrapperController(commentController.getOne));
router.put(
  '/user/:userId/comments/:commentId',
  validationMiddleware<UpdateCommentDto>(UpdateCommentDto),
  wrapperController(commentController.update),
);
router.delete('/user/:userId/comments/:commentId', wrapperController(commentController.remove));
