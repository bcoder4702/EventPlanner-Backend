import express from 'express';
import cors from 'cors';
import http from 'http';
import { config } from 'dotenv';

config();
const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/', router);

const httpServer = http.createServer(app);

const PORT=process.env.PORT || 8002;

httpServer.listen(PORT, () => {
  console.log(`🚀: Server is running at ${PORT}`);
});
