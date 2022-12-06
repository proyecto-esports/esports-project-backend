import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import setUpCloudinary from '../utils/helpers/cloudinary.js';
import routes from '../routes/index.js';
import passport from 'passport';


dotenv.config();
setUpCloudinary();
const app = express();





app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true }));

routes(app);



export default app;
