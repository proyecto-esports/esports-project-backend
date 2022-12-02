import mongoose from 'mongoose';
import dotenv from 'dotenv';

import competition from '../entities/competicion-entity.js';

import config from 'config-yml';
import { LogInfo, LogDanger } from '../../utils/magic.js';

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
  });
  LogInfo('Conectado a la base de datos 🚀');
} else {
  LogDanger('No existe la base de datos 💥');
}

export default db;
