import express, { Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { dataSource } from './data-source';
import userRoutes from './routes/userRoutes';
import homeRoutes from './routes/homeRoutes';

const app: Express = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'], 
}));
app.use(bodyParser.json());

app.use('/user', userRoutes);
app.use('/home', homeRoutes);

const startServer = async (): Promise<void> => {
  try {
    await dataSource.initialize();
    console.log('Data Source has been initialized!');

    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  } catch (error) {
    console.error('Error during Data Source initialization', error);
  }
};

startServer();
