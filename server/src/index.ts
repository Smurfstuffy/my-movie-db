import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes';
import path from 'path';

const envFile =
  process.env.NODE_ENV === 'production' ? '.env.production' : '.env';

dotenv.config({path: path.resolve(__dirname, `../${envFile}`)});

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URL = process.env.MONGO_URL;
if (!MONGO_URL) {
  throw new Error('MONGO_URL is not defined in .env file');
}

mongoose
  .connect(MONGO_URL, {
    dbName: 'my_movie_db',
  })
  .then(() => {
    console.log('Database is connected');
  })
  .catch(error => {
    console.log(error);
  });

app.use('/', router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
