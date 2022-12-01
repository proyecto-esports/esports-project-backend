import conn from '../repositories/mongo.repository.js';
import magic from '../../utils/magic.js';

import { db as conn } from '../repositories/mongo.repository.js'

const db = conn.db.connMongo;

exports.Create = async (info) => {
  try {
    const { user, money } = info;
    const data = await new db.Bid(info);
    const savedBid = await data.save();
    return savedBid;
  } catch (error) {
    magic.LogDanger('Cannot create Bid', error);
    return await { error: { code: 123, message: error } };
  }
};

exports.Delete = async (req) => {
  try {
    const { id } = req.params;
    const bid = await db.Bid.findByIdAndDelete(id);
    return bid;
  } catch (error) {
    magic.LogDanger('Cannot delete bid', error);
    return await { error: { code: 123, message: error } };
  }
};
