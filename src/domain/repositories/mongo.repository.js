import mongoose from 'mongoose';
import dotenv from 'dotenv';

import config from 'config-yml';
import { LogDanger, LogInfo } from '../../utils/magic.js';
import bid from '../entities/entity-bid.js';
import player from '../entities/player-entity.js';

dotenv.config();

let db = {};

if (config.db.mongodb && config.db.mongodb.length > 0) {
  config.db.mongodb.map((c) => {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db[c.nameconn] = {};
    db[c.nameconn].conn = mongoose;

    db[c.nameconn].Competition = competition(mongoose);
    db[c.nameconn].Player = player(mongoose);
    db[c.nameconn].Bid = bid(mongoose);
  });
  LogInfo('Conectado a la base de datos 🚀');
} else {
  LogDanger('No existe la base de datos 💥');
}

export default db;
