import express from 'express';
import cors from 'cors';
import router from './src/routes';
import { PORT } from './src/config';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at ${PORT}`);
});
