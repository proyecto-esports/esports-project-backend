import { default as conn } from '../repositories/mongo.repository.js';
import { LogDanger } from '../../utils/magic.js';
import { diskStorage } from 'multer';

const db = conn.connMongo;

export const GetAll = async () => {
  try {
    return await db.Competition.find().populate('users market');
  } catch (error) {
    LogDanger('Cannot getAll competition', error);
    return await { error: { code: 123, message: error } };
  }
};

export const Create = async (req) => {
  try {
    const data = await new db.Competition(req);
    const saveCompetition = await data.save();
    return saveCompetition;
  } catch (error) {
    LogDanger('Cannot create competition', error);
    return await { error: { code: 123, message: error } };
  }
};

export const GetOne = async (req) => {
  try {
    const { id } = req.params;
    const competition = await db.Competition.findById(id).populate(
      'users market'
    );
    if (!competition) return LogDanger('Cannot get the competition');
    return competition;
  } catch (error) {
    LogDanger('Cannot get the competition', error);
    return { error: { code: 123, message: error } };
  }
};

export const GetName = async (req) => {
  try {
    const { name } = req.params;
    const competition = await db.Competition.find({ name: name }).populate(
      'users market'
    );
    console.log(competition);
    if (!competition) return LogDanger('Cannot get the competition');
    return competition;
  } catch (error) {
    LogDanger('Cannot get the competition', error);
    return await { error: { code: 123, message: error } };
  }
};

export const Update = async (req) => {
  try {
    const { id } = req.params;
    const competitionUpdate = await db.Competition.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    ).populate('users market');
    competitionUpdate._id = id;

    console.log(competitionUpdate);
    return competitionUpdate;
  } catch (error) {
    LogDanger('Cannot update the competition', error);
    return await { error: { code: 123, message: error } };
  }
};

export const UpdateUsers = async (req) => {
  try {
    const { id } = req.params;
    const { user } = req.body;
    const competitionUpdate = await db.Competition.findByIdAndUpdate(id, {
      $push: { users: user },
    });
    return competitionUpdate;
  } catch (error) {
    LogDanger('Cannot update the users of the competition', error);
    return await { error: { code: 123, message: error } };
  }
};

export const UpdateMarket = async (req) => {
  try {
    const { id } = req.params;
    const selectCompetition = await db.Competition.findById(id)
      .populate({ path: 'market', populate: { path: 'bids' } })
      .populate({
        path: 'users',
        populate: { path: 'players' },
      });

    const competitionUsers = selectCompetition.users;
    // DESACTIVO JUGADORES ACTUALES
    const disabledPlayers = selectCompetition.market;

    // ASIGNO JUGADORES A GANADORES
    disabledPlayers.forEach((player) => {
      if (player.bids.length) {
        player.bids.sort((bidA, bidB) => {
          if (bidA.money > bidB.money) return -1;
          if (bidA.money < bidB.money) return 1;
          return 0;
        });

        player.bids.forEach(async (bid, i) => {
          if (i === 0) {
            await db.User.findByIdAndUpdate(
              bid.user,
              {
                $push: { players: bid.player },
              },
              { new: true }
            );
          } else {
            await db.User.findByIdAndUpdate(bid.user, {
              $inc: { money: bid.money },
            });
          }
          // $unset deletes a specified field, no matter what value you pass
          await db.Player.findByIdAndUpdate(player._id, {
            $unset: { bids: [] },
          });
        });
      }
    });

    // DESACTIVO JUGADORES EN POSESIÓN
    const allPlayers = await db.Player.find();
    competitionUsers.forEach((user) => {
      user.players.forEach((player) => {
        disabledPlayers.push(player);
      });
    });

    const freePlayers = allPlayers.filter((player) => {
      let free = true;

      disabledPlayers.forEach((disabledPlayer) => {
        if (disabledPlayer.nickname === player.nickname) free = false;
      });

      return free;
    });

    const randomMarket = freePlayers.sort(() => Math.random() - 0.5);

    if (randomMarket.length) {
      const competitionUpdate = await db.Competition.findByIdAndUpdate(
        id,
        {
          $set: {
            market: randomMarket.slice(0, 1),
          },
        },
        { new: true }
      );

      return competitionUpdate;
    }

    return {
      error: {
        code: 500,
        message: 'There are no available players on the market',
      },
    };
  } catch (error) {
    LogDanger('Cannot update the market', error);
    return await { error: { code: 123, message: error } };
  }
};

export const Delete = async (req) => {
  try {
    const { id } = req.params;
    const competition = await db.Competition.findByIdAndDelete(id);
    return competition;
  } catch (error) {
    LogDanger('Cannot delete competition', error);
    return await { error: { code: 123, message: error } };
  }
};
