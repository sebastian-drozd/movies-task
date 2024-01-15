import express, { Request, Response, Application } from 'express';

const app: Application = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world');
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
