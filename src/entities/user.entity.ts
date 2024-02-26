import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommentEntity } from './comment.entity';

@Entity({ name: 'user' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column('varchar', { length: 255, nullable: false })
    name?: string;

    @Column('varchar', { length: 255, nullable: false })
    email?: string;


    @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.user)
    comments?: CommentEntity[];
}