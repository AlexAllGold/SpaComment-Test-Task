import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsersEntity } from './users.entity';

@Entity({ name: 'comments' })
export class CommentsEntity {
  @PrimaryGeneratedColumn()
    // @ts-expect-error
    id: number;

  @Column('int', { nullable: false })
    // @ts-expect-error
    userId: number;

  @Column('int', { nullable: true })
    parentCommentId?: number;

  @Column('varchar', { length: 1024, nullable: false })
    // @ts-expect-error
    commentText: string;

  @Column('timestamp')
    // @ts-expect-error
    commentDate: Date;

  @ManyToOne(() => UsersEntity, (user: UsersEntity) => user.comments)
    // @ts-expect-error
    user: UsersEntity;
}
