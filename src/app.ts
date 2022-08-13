import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import UserRoutes from './routes/UserRoutes';
import AuthRoutes from './routes/AuthRoutes';

import "reflect-metadata"

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser());

app.use('/user', UserRoutes);
app.use('/auth', AuthRoutes);

export default app;