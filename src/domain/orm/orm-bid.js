import conn from '../repositories/mongo.repository.js';
import { LogDanger } from '../../utils/magic.js';

const db = conn.connMongo;

export const GetAll = async () => {
  try {
    return await db.Bid.find();
  } catch (error) {
    LogDanger('Cannot getAll bids', error);
    return await { error: { code: 123, message: error } };
  }
}

export const Create = async (info) => {
  try {
    const { user, money } = info;
    const data = await new db.Bid(info);
    const savedBid = await data.save();
    return savedBid;
  } catch (error) {
    LogDanger('Cannot create Bid', error);
    return await { error: { code: 123, message: error } };
  }
};

export const Delete = async (req) => {
  try {
    const { id } = req.params;
    const bid = await db.Bid.findByIdAndDelete(id);
    return bid;
  } catch (error) {
    LogDanger('Cannot delete bid', error);
    return await { error: { code: 123, message: error } };
  }
};

export const Update = async (req) => {
  try {
      const { id } = req.params;
      const newBid = await new db.Bid(req.body)
      newBid._id = id;
      const bidUpdate = await db.Bid.findByIdAndUpdate(id, newBid);
      return bidUpdate;
  } catch (error) {
    LogDanger('Cannot update the bid', error)
    return await { error: { code: 123, message: error } };
  }
};