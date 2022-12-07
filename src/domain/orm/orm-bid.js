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
    const { userId, money, playerId } = req.body;

    const user = await db.User.findById(userId).populate({
      path: 'competition',
      populate: { path: 'users market' },
    });
    const player = await db.Player.findById(playerId);

    const competition = user.competition;
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
      (userMarket) => userMarket._id === userId
    );
    if (!userInMarket)
      return { error: { code: 400, message: 'The user is not in the market' } };
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

      await db.User.findByIdAndUpdate(userId, { money: user.money - money });

      const bidInPlayer = await db.Player.findByIdAndUpdate(
        playerId,
        {
          $push: { bids: savedBid._id },
        },
        { new: true }
      );

      return bidInPlayer;
    }
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

    const updatedBid = await db.Bid.findByIdAndUpdate(
      id,
      { money: money },
      { new: true }
    );

    await db.User.findByIdAndUpdate(user._id, {
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
