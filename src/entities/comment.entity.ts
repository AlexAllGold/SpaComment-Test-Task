import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'comment' })
export class CommentEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column('int', { nullable: false })
    userId?: number;

    @Column('int')
    parentCommentId?: number;

    @Column('varchar', { length: 1024, nullable: false })
    commentText?: string;

    @Column('timestamp')
    commentData?: Date;


    @ManyToOne(() => UserEntity, (user: UserEntity) => user.comments)
    user?: UserEntity;
}