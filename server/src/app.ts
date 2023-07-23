// libraries
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import passport from 'passport';

import router from './router';
import connectDB from './model/database';

import { sessionConfig } from './controllers/auth/authController';

const PORT = process.env.PORT || 3000;
const app = express();
dotenv.config();
connectDB();
// -------------------- Middlewares -------------------- //
app.use(morgan('dev'));
app.use(cors({ origin: [`${process.env.FRONTEND_URI}`], credentials: true }));
app.use(express.json());
// passport js
app.use(sessionConfig);
app.use(passport.initialize());
app.use(passport.session());

// -------------------- Routes -------------------- //
app.use('/api', router);

// -------------------- DB connection -------------------- //
mongoose.connection.once('open', () => {
  console.clear();
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
