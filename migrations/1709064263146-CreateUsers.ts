import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1708949959870 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS users
        (
            id     SERIAL PRIMARY KEY,
            name   VARCHAR(255) NOT NULL,
            email  VARCHAR(255) NOT NULL
        );

    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE users');
    }
}