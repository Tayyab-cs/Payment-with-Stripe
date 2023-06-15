import express from 'express';
import dotenv from 'dotenv';
import route from './routes/routes.js';

dotenv.config();

const app = express();
const { PORT } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('', route);

app.listen(PORT, () => {
  console.log(`server is runnning on port: ${PORT}`);
});
