import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import setUpCloudinary from '../utils/helpers/cloudinary.js';
import routes from '../routes/index.js';
import passport from 'passport';


dotenv.config();
setUpCloudinary();
const app = express();

app.use(passport.initialize())

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true }));
app.use(cookieParser());

const {
  JWT_USER_ACCESS_KEY,
  JWT_USER_REFRESH_KEY,
  JWT_ADMIN_TOKEN_KEY,
  JWT_ADMIN_REFRESH_KEY,
  ACCESS_EXPIRE_TIME,
  REFRESH_EXPIRE_TIME,
} = process.env;

app.set('userAccessKey', JWT_USER_ACCESS_KEY);
app.set('userRefreshKey', JWT_USER_REFRESH_KEY);
app.set('adminAccessKey', JWT_ADMIN_TOKEN_KEY);
app.set('adminRefreshKey', JWT_ADMIN_REFRESH_KEY);
app.set('accessExpireTime', ACCESS_EXPIRE_TIME);
app.set('refreshExpireTime', REFRESH_EXPIRE_TIME);

routes(app);

export default app;
