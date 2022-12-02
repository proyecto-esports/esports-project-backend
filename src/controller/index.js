import express from 'express';

import * as competition from '../domain/services/competicion-service.js';
import * as bid from '../domain/services/service-bid.js';

const router = express.Router();

router.post('/competition', competition.Create);
router.get('/competition', competition.GetAll);
router.get('/competition/:id', competition.GetOne);
router.get('/competition/name/:name', competition.GetName);
router.patch('/competition/:id', competition.Update);
router.patch('/competition/:id', competition.UpdateUsers);
router.delete('/competition/:id', competition.Delete);

router.post('/bids', bid.Create)
router.delete('/bids/:id', bid.Delete)


export default router;
