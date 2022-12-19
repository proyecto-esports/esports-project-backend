import conn from '../repositories/mongo.repository.js';
import { LogDanger } from '../../utils/magic.js';

const db = conn.connMongo;

export const GetAll = async () => {
  try {
    const bids = await db.Bid.find().populate('player');
    return bids;
  } catch (error) {
    LogDanger('Cannot getAll bids', error);
    return await { error: { code: 123, message: error } };
  }
};

export const Create = async (req) => {
  try {
    const { userId, money, playerId } = req.body;

    const user = await db.User.findById(userId).populate({
      path: 'competition',
      populate: [
        { path: 'users' },
        {
          path: 'market',
          populate: { path: 'bids', populate: { path: 'user' } },
        },
      ],
    });

    const competition = user.competition;

    const player = competition.market.find(
      (player) => JSON.stringify(player._id) === JSON.stringify(playerId)
    );

    const existentBid = player.bids.find(
      (bid) => JSON.stringify(bid.user._id) === JSON.stringify(userId)
    );

    if (existentBid) return Update(existentBid, money);

    if (!competition)
      return {
        error: { code: 400, message: 'The user is not in the competition' },
      };

    const playersInMarket = competition.market;
    const usersInMarket = competition.users;
    const playerMarket = playersInMarket.find(
      (play) => play.nickname === player.nickname
    );

    if (!playerMarket)
      return {
        error: { code: 400, message: 'The player is not in the market' },
      };

    const valuePlayer = playerMarket.value;

    if (valuePlayer !== player.value)
      return {
        error: {
          code: 400,
          message:
            'The value of the player does not correspond with original value',
        },
      };

    const userInMarket = usersInMarket.find(
      (userMarket) => userMarket._id.toString() === userId.toString()
    );

    if (!userInMarket)
      return {
        error: { code: 400, message: 'The user is not in the competition' },
      };
    else if (user.money < money)
      return { error: { code: 400, message: "You don't have enough money" } };
    else if (player.value > money)
      return {
        error: {
          code: 400,
          message: `The minimun bid is ${player.value} e-coins.`,
        },
      };
    else {
      const bid = await new db.Bid({
        user: userId,
        money: money,
        player: playerId,
      });
      const savedBid = await bid.save();

      const updatedUser = await db.User.findByIdAndUpdate(
        userId,
        { money: user.money - money },
        { new: true }
      ).populate('players lineup competition');

      await db.Player.findByIdAndUpdate(playerId, {
        $push: { bids: savedBid._id },
      });

      return updatedUser;
    }
  } catch (error) {
    LogDanger('Cannot create Bid', error);
    return await { error: { code: 123, message: error } };
  }
};

const Update = async (existentBid, money) => {
  try {
    const { user, _id: id } = existentBid;

    if (user.money + existentBid.money < money)
      return {
        error: {
          code: 400,
          message: "Your total money isn't enought to make that bid",
        },
      };

    const updatedBid = await db.Bid.findByIdAndUpdate(
      id,
      { money: money },
      { new: true }
    );

    await db.User.findByIdAndUpdate(user._id, {
      $inc: { money: existentBid.money - money },
    });

    return updatedBid;
  } catch (error) {
    LogDanger('Cannot update bid', error);
    return await { error: { code: 123, message: error } };
  }
};

export const DeleteAll = async (req) => {
  try {
    const allBids = await db.Bid.find();
    allBids.forEach(async (bid) => {
      // Retiro puja del jugador
      await db.Player.findByIdAndUpdate(bid.player, {
        $pull: { bids: bid._id },
      });
      // Devuelvo dinero al usuario
      await db.User.findByIdAndUpdate(bid.user, { $inc: { money: bid.money } });
    });
    // Elimino todas las pujas
    const removedBids = await db.Bid.collection.drop();
    if (removedBids) return 'Collection deleted';
  } catch (error) {
    LogDanger('Cannot delete bid', error);
    return await { error: { code: 123, message: error } };
  }
};

export const Delete = async (req) => {
  try {
    const { id } = req.params;
    const bid = await db.Bid.findByIdAndUpdate(id);
    await db.User.findByIdAndUpdate(bid.user, { $inc: { money: bid.money } });
    const removedBid = await db.Bid.findByIdAndDelete(id);
    return removedBid;
  } catch (error) {
    LogDanger('Cannot delete bid', error);
    return await { error: { code: 123, message: error } };
  }
};
