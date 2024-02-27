import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommentEntity } from './comment.entity';

@Entity({ name: 'user' })
export class UserEntity {
    @PrimaryGeneratedColumn()
        // @ts-ignore
    id: number;

    @Column('varchar', { length: 255, nullable: false })
        // @ts-ignore
    name: string;

    @Column('varchar', { length: 255, nullable: false })
        // @ts-ignore
    email: string;


    @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.user)
        // @ts-ignore
    comments: CommentEntity[];
}