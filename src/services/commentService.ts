import { DeepPartial, type Repository } from "typeorm";
// import { BadRequestException } from '../utils/exceptions/BadRequestException';
import { CreateCommentDto } from '../dtos/createComment.dto';
import { CommentsEntity } from '../entities/comments.entity';
import { Database } from '../config/database';
import { UpdateCommentDto } from '../dtos/updateComment.dto';

class CommentService {
  commentRepository: Repository<CommentsEntity>;

  constructor() {
    this.commentRepository = Database.dataSource.getRepository(CommentsEntity);
  }

  async getAllByUserId(userId: number): Promise<CommentsEntity[]> {
    return this.commentRepository.findBy({ userId });
  }

  async getOne(userId: number, id: number): Promise<CommentsEntity> {
    console.log( userId, id);

    const comment: CommentsEntity | null = await this.commentRepository.findOneBy({ userId, id });
    if (comment) {
      return comment;
    }
    // throw new BadRequestException('Can not find this comment!');
    throw new Error('Can not find this comment!');
  }

  async create(params: Record<string, string>, dto: CreateCommentDto): Promise<DeepPartial<CommentsEntity>[]> {
    this.compareIds(Number(params.userId), Number(dto.userId));
    // @ts-ignore
    return this.commentRepository.save(dto);
  }

  async update(params: Record<string, string>, dto: UpdateCommentDto): Promise<CommentsEntity> {
    this.compareIds(Number(params.id), dto.commentId);
    this.compareIds(Number(params.commentId), dto.commentId);
    const comment: CommentsEntity = await this.getOne(dto.userId, dto.commentId);
    // @ts-ignore
    this.commentRepository.merge(comment, dto);
    return await this.commentRepository.save(comment);
  }

  async remove(userId: number, id: number): Promise<void> {
    console.log( userId, id);
    await this.getOne(userId, id);
    await this.commentRepository.delete(id);
  }

  private compareIds(id: number, dtoId: number): void {
    if (id !== Number(dtoId)) {
      // throw new BadRequestException('Id Comment does not match');
      throw new Error('Id Comment does not match');
    }
  }
}

export const commentService: CommentService = new CommentService();
