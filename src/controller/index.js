import express from 'express';
import upload from '../utils/middlewares/file.js';

import * as user from '../domain/services/service-user.js'

const router = express.Router();

router.post('/users/register', user.Create);
router.get('/users', user.GetAll);
router.delete('/users/:id', user.Delete);
router.patch('/users/:id', user.Update);
router.get('/users/:id', user.GetOne);
router.put('/users/:id', user.UpdatePlayers);
router.put('/users/lineup/:id', user.UpdateLineup);

export default router;
