import express from 'express';

import * as player from '../domain/services/player-service.js';

const router = express.Router();

router.post('/players', player.Create);

export default router;
