import mongoose from 'mongoose';
import dotenv from 'dotenv';

import bid from '../entities/entity-bid.js';
import config from 'config-yml';
import magic from '../../utils/magic.js';

dotenv.config();

let db = {};

if (config.db.mongodb && config.db.mongodb.length > 0) {
  config.db.mongodb.map((c) => {
    mongoose.connect(env.process.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db[c.nameconn] = {};
    db[c.nameconn].conn = mongoose;
    db[c.nameconn].Bid = bid(mongoose);
  });
  magic.LogInfo('Conectado a la base de datos 🚀');
} else {
  magic.LogDanger('No existe la base de datos 💥');
}

export default db;
