import { Repository } from 'typeorm';
import { Database } from '../config/database';
// import { BadRequestException } from '../utils/exceptions/BadRequestException';
import { CreateCommentDto } from '../dtos/createComment.dto';
import { UpdateCommentDto } from '../dtos/updateComment.dto';
import { PaginationDto } from '../dtos/pagination.dto'
import { CommentsEntity } from '../entities/comments.entity';

class CommentService {
  commentRepository: Repository<CommentsEntity>;

  //TODO: изменить page на 25 после полного теста!

  constructor() {
    this.commentRepository = Database.dataSource.getRepository(CommentsEntity);
  }

  async getAllComments(userId: number): Promise<CommentsEntity[]> {
    return this.commentRepository.createQueryBuilder('comments')
      .where('comments.userId = :userId', { userId })
      .andWhere('comments.parentCommentId IS NULL')
      .getMany();
  }

  async getOneTree(userId: number, id: number, { page, limit } : PaginationDto): Promise<CommentsEntity[]> {
    const comment: CommentsEntity | null = await this.commentRepository.findOne({
      where: {
        userId,
        id,
      },
      relations: {
        comments: true,
        parentComment: true
      },
    });
    if (comment) {
      console.log(page, limit)
      const totalLimit = page! * limit!;
      return comment.comments = await this.getCommentTree([], comment, totalLimit);
    }
    // throw new BadRequestException('Can not find this comment!');
    throw new Error('Can not find this comment!');
  }

  async create(params: Record<string, string>, dto: CreateCommentDto): Promise<CommentsEntity> {
    this.compareIds(Number(params.userId), Number(dto.userId));
    // @ts-ignore
    return this.commentRepository.save(dto);
  }

  async update(params: Record<string, string>, dto: UpdateCommentDto): Promise<CommentsEntity> {
    this.compareIds(Number(params.userId), dto.userId);
    this.compareIds(Number(params.commentId), dto.id);
    const comment: CommentsEntity = await this.getOne(dto.userId, dto.id);
    // @ts-ignore
    this.commentRepository.merge(comment, dto);
    return this.commentRepository.save(comment);
  }

  async remove(userId: number, id: number): Promise<void> {
    await this.getOne(userId, id);
    await this.commentRepository.delete(id);
  }

  private compareIds(id: number, dtoId: number): void {
    console.log(id, dtoId);
    if (id !== Number(dtoId)) {
      // throw new BadRequestException('Id Comment does not match');
      throw new Error('Id Comment does not match');
    }
  }

  private async getOne(userId: number, id: number): Promise<CommentsEntity> {
    const comment: CommentsEntity | null = await this.commentRepository.findOne({
      where: {
        userId,
        id,
      }
    });
    if (!comment) {
      throw new Error('Can not find this comment!');

    }
    return comment;

    // throw new BadRequestException('Can not find this comment!');
  }

  private async getCommentTree(result : CommentsEntity[],parentComment: CommentsEntity, totalLimit: number): Promise<CommentsEntity[]> {
    if (!parentComment || !parentComment.id || totalLimit! <= 0) {
      return [];
    }
    const comment = await this.commentRepository.findOne({
      where: {
        id: parentComment.id,
      },
      relations: ['comments'],
    });

    if (!comment) {
      return [];
    }
    const sliceIndex =  totalLimit!;

      for (let i = 0; i <= totalLimit!; i++) {
            const childComment: CommentsEntity = comment.comments[i];
        if (comment.comments && comment.comments.length !== undefined && childComment) {
          --totalLimit;
            result.push(childComment);
              if (true!) {
              await this.getCommentTree(result, childComment, totalLimit);
            }
          }
        }

    comment.comments = result.slice(0, sliceIndex);

    return [comment];
  }

}

export const commentService: CommentService = new CommentService();
