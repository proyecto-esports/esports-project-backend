import express from 'express';
import * as competition from '../domain/services/competicion-service.js';
const router = express.Router();

router.post('/competition', competition.Create);
router.get('/competition', competition.GetAll);
router.get('/competition/:id', competition.GetOne);
router.get('/competition/name/:name', competition.GetName);
router.patch('/competition/:id', competition.Update);
router.patch('/competition/:id', competition.UpdateUsers);
router.delete('/competition/:id', competition.Delete);

export default router;
