import { type Request, type Response } from 'express';
import { CommentsEntity } from '../entities/comments.entity';
import { commentService } from '../services/commentService';
import { PaginationDto } from "../dtos/pagination.dto";

class CommentController {
  async getAllByUserId(req: Request, res: Response): Promise<void> {
    const comment: CommentsEntity[] = await commentService.getAllComments(Number(req.params.userId));
    res.status(200).json(comment);
  }

  async getOne(req: Request, res: Response): Promise<void> {
    const { page, limit } = new PaginationDto(req.query)
    const comment: CommentsEntity[] = await commentService.getOneTree(Number(req.params.userId), Number(req.params.commentId), {page, limit} );
    res.status(200).json(comment);
  }

  async create(req: Request, res: Response): Promise<void> {
    const comment: CommentsEntity = await commentService.create(req.params, req.body);
    res.status(201).json(comment);
  }

  async update(req: Request, res: Response): Promise<void> {
    const comment: CommentsEntity = await commentService.update(req.params, req.body);
    res.status(202).json(comment);
  }

  async remove(req: Request, res: Response): Promise<void> {
    await commentService.remove(Number(req.params.userId), Number(req.params.commentId));
    res.status(204).end();
  }
}

export const commentController: CommentController = new CommentController();
