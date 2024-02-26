import 'dotenv/config';


class ConfigService {
    getDbUser():string | undefined {
        return this.#getEnv('DATABASE_USERNAME');
    }

    getDbPass():string | undefined {
        return this.#getEnv('DATABASE_PASSWORD');
    }

    getNameDb():string | undefined {
        return this.#getEnv('DATABASE_DB_NAME');
    }

    getDbPort():string | undefined {
        return this.#getEnv('DATABASE_PORT');
    }

    getHost():string | undefined {
        return this.#getEnv('HOST');
    }

    getPort(): string | undefined {
        console.log(process.env['PORT'])
        return this.#getEnv('PORT');
    }

    #getEnv(nameEnv: string):string | undefined {
        if (process.env[nameEnv]) {
            return process.env[nameEnv];
        }
        throw new Error(`Env ${nameEnv} does not exist`);
    }
}
export const configService = new ConfigService();