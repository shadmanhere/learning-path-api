import express, { Express, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

//Routes
import userRoutes from './routes/users';
import tutorialsRoutes from './routes/tutorials';
import sectionsRoutes from './routes/sections';
import learningPathsRoute from './routes/learningpaths';

import { errorHandler } from './middlewares/error';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const allowedDomains = process.env.FRONT_END_DOMAINS?.split(' ');
const corsOptions = {
  origin: function (origin: string | undefined, callback: (arg0: Error | null, arg1: boolean) => any) {
    // bypass the requests with no origin (like curl requests, mobile apps, etc )
    if (!origin) return callback(null, true);

    if (allowedDomains?.indexOf(origin) === -1) {
      const msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '32mb' }));
app.use(bodyParser.urlencoded({ limit: '32mb', extended: true }));
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Learning Path Api');
});
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/learningpath', learningPathsRoute);
app.use('/api/v1/section', sectionsRoutes);
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
