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





app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true }));
app.use(cookieParser());

const {
  JWT_TOKEN_KEY_USER,
  JWT_REFRESH_KEY_USER,
  JWT_TOKEN_KEY_ADMIN,
  JWT_REFRESH_KEY_ADMIN,
  TOKEN_EXPIRE_TIME,
  REFRESH_EXPIRE_TIME,
} = process.env;

app.set('userTokenKey', JWT_TOKEN_KEY_USER);
app.set('userRefreshTokenKey', JWT_REFRESH_KEY_USER);
app.set('adminTokenKey', JWT_TOKEN_KEY_ADMIN);
app.set('adminRefreshTokenKey', JWT_REFRESH_KEY_ADMIN);
app.set('tokenExpireTime', TOKEN_EXPIRE_TIME);
app.set('refreshExpireTime', REFRESH_EXPIRE_TIME);

routes(app);

export default app;
