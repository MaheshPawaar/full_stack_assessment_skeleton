import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { Home } from './entities/Home';
import { UserHome } from './entities/UserHome';
import dotenv from 'dotenv';

dotenv.config();

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST as string,
  port: parseInt(process.env.DB_PORT as string, 10),
  username: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
  entities: [User, Home, UserHome],
});

export { dataSource };
