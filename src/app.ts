import express from 'express';

import routes from './routes';
import { errorHandler } from '@src/middlewares/handlers/error.handler';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api', routes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
