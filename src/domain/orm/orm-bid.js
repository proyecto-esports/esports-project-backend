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
};

export const Create = async (req) => {
  try {
    console.log('CREATE BID');
    const { userId, money, playerId } = req.body;
    console.log(userId);

    const user = await db.User.findById(userId);

    if (user.money < money)
      return { error: { code: 400, message: "You don't have enough money" } };

    console.log('tengo money');

    const bid = await new db.Bid({
      user: userId,
      money: money,
      player: playerId,
    });
    const savedBid = await bid.save();

    console.log(savedBid);

    await db.User.findByIdAndUpdate(userId, { money: user.money - money });

    const bidInPlayer = await db.Player.findByIdAndUpdate(playerId, {
      $push: { bids: savedBid._id },
    });
    console.log(bidInPlayer);
    return bidInPlayer;
  } catch (error) {
    LogDanger('Cannot create Bid', error);
    return await { error: { code: 123, message: error } };
  }
};

export const Update = async (req) => {
  try {
    const { id } = req.params;
    const { money } = req.body;
    const oldBid = await db.Bid.findById(id);
    const user = await db.User.findById(oldBid.user);

    if (user.money + oldBid.money < money)
      return {
        error: {
          code: 400,
          message: "Your total money isn't enought to make that bid",
        },
      };

    const updatedBid = await db.Bid.findByIdAndUpdate(id, { money: money });
    const updatedUser = await db.User.findByIdAndUpdate(user._id, {
      $inc: { money: oldBid.money - money },
    });

    return updatedBid;
  } catch (error) {
    LogDanger('Cannot update bid', error);
    return await { error: { code: 123, message: error } };
  }
};

export const DeleteAll = async (req) => {
  try {
    const removedBids = await db.collections.bids.drop();
    return removedBids;
  } catch (error) {
    LogDanger('Cannot delete bid', error);
    return await { error: { code: 123, message: error } };
  }
};

export const RenewBid = async (req) => {
  try {
    const { id } = req.params;
    const currentBid = await db.Bid.findById(id);
    const returnMoney = currentBid.money;
    const bidOwner = currentBid.user;
    const biddedPlayer = currentBid.player;
    const infoPlayer = await db.Player.findByIdAndUpdate(biddedPlayer, {
      $pull: { bids: id },
    });
    const bid = await db.Bid.findByIdAndDelete(id);
    const ownerUser = await db.User.findById(bidOwner);
    if (ownerUser) {
      let userMoney = ownerUser.money + returnMoney;
      const updateUserMoney = await db.User.findByIdAndUpdate(bidOwner, {
        $set: { money: userMoney },
      });
      return updateUserMoney;
    }
    return bid;
  } catch (error) {
    LogDanger('Cannot delete bid', error);
    return await { error: { code: 123, message: error } };
  }
};
