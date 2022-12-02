import express from 'express';

import * as bid from '../domain/services/service-bid.js';

const router = express.Router();

router.post('/bids', bid.Create)

export default router;
