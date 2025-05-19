import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './data-source';
import RegisterController from './controller/RegisterController';
import LoginController from './controller/LoginController';

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log('Connected to PostgreSQL');

    app.get('/', (req, res) => {
      res.send('Welcome to MathMaster Backend!');
    });

    const registerController = new RegisterController();
    app.use('/register', registerController.router);

    const loginController = new LoginController();
    app.use('/login', loginController.router);

    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000');
    });
  })
  .catch((err) => {
    console.error('Failed to connect to the database', err);
  });
