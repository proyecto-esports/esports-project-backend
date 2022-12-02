import express from 'express';

import * as competition from '../domain/services/competicion-service.js';
import * as bid from '../domain/services/service-bid.js';
import * as player from './../domain/services/player-service.js';

const router = express.Router();

router.post('/bids', bid.Create);
router.delete('/bids/:id', bid.Delete);
router.post('/players', player.Create);
router.get('/players', player.GetAll);
router.get('/players/:id', player.GetOne);
router.delete('/players/:id', player.Delete);
router.patch('/players/:id', player.Update);

export default router;
