import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

//Routes
import userRoutes from './routes/users';
import tutorialsRoutes from './routes/tutorials';
import sections from './routes/sections';
import learningpaths from './routes/learningpaths';

import { errorHandler } from './middlewares/error';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json({ limit: '32mb' }));
app.use(bodyParser.urlencoded({ limit: '32mb', extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Learning Path Api');
});
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/learningpath', learningpaths);
app.use('/api/v1/section', sections);
app.use('/api/v1/tutorial', tutorialsRoutes);

const server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

// Middleware to handle errors
app.use(errorHandler);

// Handle Unhandled Promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.log(`ERROR: ${err.stack}`);
  console.log('Shutting down the server due to Unhandled Promise rejection');
  server.close(() => {
    process.exit(1);
  });
});
