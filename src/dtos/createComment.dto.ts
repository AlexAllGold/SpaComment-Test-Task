import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateCommentDto {
  @IsInt()
  @IsNotEmpty()
    userId: number;

  @IsInt()
  @IsOptional()
  parentCommentId?: number | null;

  @IsString()
  @IsNotEmpty()
  @Length(4, 1000, { message: 'The comment must have from 4 to 1000 characters' })
    commentText: string;

  @IsDateString()
  @IsNotEmpty()
  commentDate: Date;

  constructor(body: CreateCommentDto) {
    this.userId = body?.userId;
    this.parentCommentId = body?.parentCommentId === undefined ? null : body.parentCommentId;
    this.commentText = body?.commentText;
    this.commentDate = body?.commentDate;
  }
}
