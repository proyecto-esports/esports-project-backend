import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import setUpCloudinary from '../utils/helpers/cloudinary.js';
import routes from '../routes/index.js';

dotenv.config();
setUpCloudinary()
const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true }));

app.set('userSecretKey', 'n30l4nDuser');
app.set('adminSecretKey', 'n30l4nDadmin');

routes(app);



export default app;
