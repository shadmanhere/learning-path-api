import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

//Routes
import userRoutes from './routes/users';
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Okay 🚀');
});
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
