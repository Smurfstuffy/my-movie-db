import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URL =
  process.env.MONGO_URL ?? 'mongodb://127.0.0.1:27017/my_movie_db';
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

const PORT = process.env.PORT ?? '4000';
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
