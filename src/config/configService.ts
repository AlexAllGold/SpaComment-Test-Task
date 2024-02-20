import 'dotenv/config';


class ConfigService {

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