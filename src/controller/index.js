import express from 'express';
import upload from '../utils/middlewares/file.js';
import * as user from '../domain/services/service-user.js';
import * as competition from '../domain/services/competicion-service.js';
import * as bid from '../domain/services/service-bid.js';
import * as player from './../domain/services/player-service.js';

const router = express.Router();

router.post('/users/register', user.Create);
router.get('/users', user.GetAll);
router.delete('/users/:id', user.Delete);
router.patch('/users/:id', user.Update);
router.get('/users/:id', user.GetOne);
router.put('/users/:id', user.UpdatePlayers);
router.put('/users/lineup/:id', user.UpdateLineup);
router.put('/users/points/:id', user.UpdatePlayersPoints);
router.put('/users/money/:id', user.UpdatePlayersMoney);
router.put('/users/competition/:id', user.UpdateCompetition);
router.put('/users/role/:id', user.UpdateRole);
router.post('/bids', bid.Create);
router.delete('/bids/:id', bid.Delete);
router.post('/players/:id/bids', player.AddBid);
router.post('/players', player.Create);
router.get('/players', player.GetAll);
router.get('/players/:id', player.GetOne);
router.delete('/players/:id', player.Delete);
router.patch('/players/:id', player.Update);

router.post('/competitions', competition.Create);
router.get('/competitions', competition.GetAll);
router.get('/competitions/:id', competition.GetOne);
router.get('/competitions/name/:name', competition.GetName);
router.patch('/competitions/:id', competition.Update);
router.put('/competitions/:id', competition.UpdateUsers);
router.put('/competitions/:id/market', competition.UpdateMarket);
router.delete('/competitions/:id', competition.Delete);

export default router;
