// db.config.ts
import { Categories } from '../models/categories';
import { Service } from '../models/service';
import { ServicePrice } from '../models/servicePrice';
import { DataSourceOptions } from 'typeorm';

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = parseInt(process.env.DB_PORT || '5432');
const DB_USERNAME = process.env.DB_USERNAME || 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD || '1234';
const DB_DATABASE = process.env.DB_DATABASE || 'folder';

// Initialize AppDataSource as a DataSource instance
export const AppDataSource:DataSourceOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [Categories, Service, ServicePrice],
  migrations: ['build/src/migrations/**/*.js'],
  migrationsTableName: 'dataBase_table',
  synchronize: true, // Use false in production
  logging: false,
  ssl: false,
};

