import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UsersEntity } from './users.entity';

@Entity({ name: 'comments' })
export class CommentsEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('int', { nullable: false })
  userId!: number;

  @Column('int', { nullable: true })
  parentCommentId?: number;

  @Column('varchar', { length: 1024, nullable: false })
  commentText!: string;

  @Column('timestamp')
  commentDate!: Date;

  @ManyToOne(() => UsersEntity, (user: UsersEntity) => user.comments)
  user!: UsersEntity;

  @OneToMany(() => CommentsEntity, (comment) => comment.parentComment, { cascade: true })
  @JoinColumn({ name: 'parentCommentId' })
  comments!: CommentsEntity[];

  @ManyToOne(() => CommentsEntity)
  @JoinColumn({ name: 'parentCommentId' })
  parentComment!: CommentsEntity;
}
