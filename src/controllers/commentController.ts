import { type Request, type Response } from 'express';
import { CommentsEntity } from '../entities/comments.entity';
import { commentService } from '../services/commentService';
import { CreateCommentDto } from '../dtos/createComment.dto';
import { UpdateCommentDto } from '../dtos/updateComment.dto';

class CommentController {
  async getAllByUserId(req: Request, res: Response): Promise<void> {
    // @ts-ignore
    const comment: CommentsEntity[] = await commentService.getAllByUserId(Number(req.params.userId));
    res.status(200).json(comment);
  }

  async getOne(req: Request, res: Response): Promise<void> {
    // @ts-ignore
    const comment: CommentsEntity = await commentService.getOne(Number(req.params.userId), Number(req.params.commentId));
    res.status(200).json(comment);
  }

  async create(req: Request, res: Response): Promise<void> {
    // @ts-ignore
    const comment: CommentsEntity = await commentService.create(req.params, req.body as CreateCommentDto);
    res.status(201).json(comment);
  }

  async update(req: Request, res: Response): Promise<void> {
    // @ts-ignore
    const comment: CommentsEntity = await commentService.update(req.params, req.body as UpdateCommentDto);
    res.status(204).json(comment);
  }

  async remove(req: Request, res: Response): Promise<void> {
    await commentService.remove(Number(req.params.userId), Number(req.params.commentId));
    res.status(400).end().json('deleted');
  }
}

export const commentController: CommentController = new CommentController();
