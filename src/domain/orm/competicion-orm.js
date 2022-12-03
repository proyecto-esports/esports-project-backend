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
    LogDanger('Cannot update the competition', error);
    return await { error: { code: 123, message: error } };
  }
};

export const UpdateMarket = async (req) => {
  try {
    const { id } = req.params;
    const selectCompetition = await db.Competition.findById(id)
      .populate('market')
      .populate({
        path: 'users',
        populate: { path: 'players' },
      });

    const competitionUsers = selectCompetition.users;
    const disabledPlayers = selectCompetition.market;
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

    const randomMarket = freePlayers.sort(function () {
      return Math.random() - 0.5;
    });

    console.log('SLICE', randomMarket.slice(0, 10));

    console.log('randomMarket', randomMarket);
    if (randomMarket.length !== 0) {
      console.log('market');
      const competitionUpdate = await db.Competition.findByIdAndUpdate(id, {
        $set: {
          market: randomMarket.slice(0, 1),
        },
      });
      console.log('NO ROMPE');
      console.log(competitionUpdate);
      return competitionUpdate;
    }
    console.log('HOLA');
    return await {
      error: {
        code: 500,
        message: 'There are no available players on the market',
      },
    };
  } catch (error) {
    LogDanger('Cannot update the competition', error);
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
