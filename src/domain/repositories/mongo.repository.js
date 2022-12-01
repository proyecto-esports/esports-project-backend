import mongoose from 'mongoose';
import dotenv from 'dotenv';

import config from 'config-yml';
import {LogInfo, LogDanger} from '../../utils/magic.js';
import user from '../entities/entity-user.js'

dotenv.config();

let db = {};

if (config.db.mongodb && config.db.mongodb.length > 0) {
  config.db.mongodb.map((c) => {
    mongoose.connect('mongodb+srv://root:root@cluster0.23ouj33.mongodb.net/e-tacticals?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db[c.nameconn] = {};
    db[c.nameconn].conn = mongoose;
    db[c.nameconn].User = user(mongoose);
  });
  LogInfo('Conectado a la base de datos 🚀');
} else {
  LogDanger('No existe la base de datos 💥');
}

export default db;
