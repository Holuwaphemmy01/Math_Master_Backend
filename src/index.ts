import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './data-source';
import RegisterController from './controller/RegisterController';
import LoginController from './controller/LoginController';
import FetchQuestionController from './controller/FetchQuestionController';
import ExplainQuestionController from './controller/ExplainQuestionController';
import CorrectAnswerController from './controller/CorrectAnswerController';
import ExplainAndAnswerController from './controller/ExplainAndAnswerController';


const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log('Connected to PostgreSQL');

    const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


    app.get('/', (req, res) => {
      res.send('Welcome to MathMaster Backend!');
    });

    const registerController = new RegisterController();
    app.use('/register', registerController.router);

    const loginController = new LoginController();
    app.use('/login', loginController.router);

    const fetchQuestionController = new FetchQuestionController();
    app.use('/fetchQuestion', fetchQuestionController.router);

    const explainQuestionController = new ExplainQuestionController();
    app.use('/explainQuestion', explainQuestionController.router);

    const correctAnswerController = new CorrectAnswerController();
    app.use('/checkAnswer',correctAnswerController.router)

    const explainAndAnswerController = new ExplainAndAnswerController();
    app.use('/explainAndExplain', explainAndAnswerController.router);

    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000');
    });
  })
  .catch((err) => {
    console.error('Failed to connect to the database', err);
  });
