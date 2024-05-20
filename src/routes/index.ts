import express from 'express';
import healthRouter from './health.js';
import usersRouter from './users.js';
import eventsRouter from './events.js';

const app = express.Router();

app.use('/health', healthRouter);
app.use('/users', usersRouter);
app.use('/events', eventsRouter);

export default app;
