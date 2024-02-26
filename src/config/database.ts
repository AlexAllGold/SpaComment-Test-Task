import { DataSource, DataSourceOptions } from 'typeorm';
import { configService } from './configService';
import { CommentEntity } from '../entities/comment.entity';
import { UserEntity } from '../entities/user.entity';

export class Database {
    static dataSource: DataSource;

    static {
        const options: DataSourceOptions = {
            type: 'postgres',
            host: configService.getHost(),
            port: Number(configService.getDbPort()),
            username: configService.getDbUser(),
            password: configService.getDbPass(),
            database: configService.getNameDb(),
            entities: [UserEntity, CommentEntity],
            migrations: ['migrations/*.ts'],
            logging: true,
            synchronize: true,
        };
        this.dataSource = new DataSource(options);
    }

    static initialize(): void {
        this.dataSource.initialize()
            .then(() => {
                console.log('Connected to Database');
            })
            .catch((err: Error) => {
                console.log(`Error connecting to Database:${err.message}`);
                process.exit(1);
            });
    }
}

export default Database.dataSource;