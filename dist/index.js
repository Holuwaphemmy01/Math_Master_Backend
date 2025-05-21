"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const RegisterController_1 = __importDefault(require("./controller/RegisterController"));
const LoginController_1 = __importDefault(require("./controller/LoginController"));
const FetchQuestionController_1 = __importDefault(require("./controller/FetchQuestionController"));
const ExplainQuestionController_1 = __importDefault(require("./controller/ExplainQuestionController"));
const CorrectAnswerController_1 = __importDefault(require("./controller/CorrectAnswerController"));
const ExplainAndAnswerController_1 = __importDefault(require("./controller/ExplainAndAnswerController"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log('Connected to PostgreSQL');
    app.get('/', (req, res) => {
        res.send('Welcome to MathMaster Backend!');
    });
    const registerController = new RegisterController_1.default();
    app.use('/register', registerController.router);
    const loginController = new LoginController_1.default();
    app.use('/login', loginController.router);
    const fetchQuestionController = new FetchQuestionController_1.default();
    app.use('/fetchQuestion', fetchQuestionController.router);
    const explainQuestionController = new ExplainQuestionController_1.default();
    app.use('/explainQuestion', explainQuestionController.router);
    const correctAnswerController = new CorrectAnswerController_1.default();
    app.use('/checkAnswer', correctAnswerController.router);
    const explainAndAnswerController = new ExplainAndAnswerController_1.default();
    app.use('/explainAndExplain', explainAndAnswerController.router);
    app.listen(3000, () => {
        console.log('Server running on http://localhost:3000');
    });
})
    .catch((err) => {
    console.error('Failed to connect to the database', err);
});
