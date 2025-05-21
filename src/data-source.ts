// import { DataSource } from 'typeorm';
// import { User } from './data/model/User';
// import dotenv from 'dotenv'

// dotenv.config();
// export const AppDataSource = new DataSource({
//   type: "postgres",
//   host: process.env.DB_HOST,
//   port: 5432,
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.NAME,
//   synchronize: true,
//   dropSchema: true,
//   logging: false,
//   entities: [User],
// });


import { DataSource } from 'typeorm';
import { User } from './data/model/User';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true,
  dropSchema: true,
  logging: false,
  ssl: {
    rejectUnauthorized: false, // required for Render
  },
  entities: [User],
});
