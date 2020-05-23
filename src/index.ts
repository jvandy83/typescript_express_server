import express from 'express';
import { AppRouter } from './AppRouter';
import './controllers/LoginController';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['kdjslfkfj'] }));
app.use(AppRouter.getInstance());

app.listen(5000, () => {
  console.log('listening on port 5000');
});
