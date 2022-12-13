export interface IType {
  [key: string]: string;
}

export interface IApp {
  mode: string;
  port: number;
  appEnv: string;
}

export interface ICors {
  origin: string;
  methods: string;
}

export interface IDatabase {
  sync: boolean;
  logging: boolean;
  pool: {
    max: number;
    min: number;
    idle: number;
  };
  con: {
    username: string;
    password: string;
    database: string;
    host: string;
    port: number;
  };
}

export interface ILogger {
  debug: boolean;
}

export interface IPaginator {
  maxPageSizeLimit: number; // Sort Types
  sortTypes: IType;
}

export interface IRedis {
  host: string | undefined;
  post: number;
  password: string | undefined;
}

export interface IJwt {
  key: string;
  expiration: number;
  algorithm: string;
  cache_prefix: string;
  allow_renew: boolean;
  renew_threshold: number;
}
export interface IConfigModel {
  readonly app: IApp;
  readonly cors: ICors;
  readonly database: IDatabase;
  readonly logger: ILogger;
  readonly paginator: IPaginator;
  readonly redis: IRedis;
  readonly jwt: IJwt;
}
