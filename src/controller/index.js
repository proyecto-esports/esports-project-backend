import express from 'express';
import upload from '../utils/middlewares/file.js';

import * as user from '../domain/services/service-user.js'

const router = express.Router();

router.post('/users/register', upload.single('image'), user.Create);

export default router;
