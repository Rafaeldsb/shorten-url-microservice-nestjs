export type Env = 'prod' | 'test' | 'dev';

export interface Config {
  env: Env;
  typeorm: {
    type: 'postgres';
    host: string;
    port?: number;
    username: string;
    password: string;
    database: string;
    sincronize: boolean;
  };
}

export const configuration: Config = {
  env: (process.env.ENVIRONMENT as Env) || 'dev',
  typeorm: {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_HOST) || 5432,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    database: 'app',
    sincronize: true,
  },
};
