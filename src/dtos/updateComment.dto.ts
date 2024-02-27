import { IsInt, IsNotEmpty } from 'class-validator';
import { CreateCommentDto } from './createComment.dto';

export class UpdateCommentDto extends CreateCommentDto {
  @IsInt()
  @IsNotEmpty()
  commentId: number;

  constructor(body: UpdateCommentDto) {
    super(body);
    this.commentId = body?.commentId;
  }
}
