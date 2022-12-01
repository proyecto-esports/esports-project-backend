import express from 'express';
import upload from '../utils/middlewares/file.js';

import * as user from '../domain/services/service-user.js'

const router = express.Router();
console.log(user);
router.post('/users/register', user.Create);

export default router;
