import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateComment1708950258230 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS comments
        (
            id              SERIAL PRIMARY KEY,
            userId          INT           NOT NULL,
            parentCommentId INT DEFAULT 0,
            commentText     VARCHAR(1024) NOT NULL,
            commentDate     DATE          NOT NULL
        );
    `);

        await queryRunner.query(`
            ALTER TABLE comments
                ADD CONSTRAINT user_comments_fk FOREIGN KEY ("userId") REFERENCES users(id);
            `);

        await queryRunner.query(`
            ALTER TABLE comments
                ADD CONSTRAINT parent_comment_fk
                    FOREIGN KEY ("parentCommentId")
                        REFERENCES comments(id);
    `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE comments');
    }
}
