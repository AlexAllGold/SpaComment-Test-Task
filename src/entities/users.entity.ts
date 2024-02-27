import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommentsEntity } from './comments.entity';


@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn()
    // @ts-expect-error
  id: number;

  @Column('varchar', { length: 255, nullable: false })
    // @ts-expect-error
  name: string;

  @Column('varchar', { length: 255, nullable: false })
    // @ts-expect-error
  email: string;

  @OneToMany(() => CommentsEntity, (comment: CommentsEntity) => comment.user)
  comments!: CommentsEntity[];
}
