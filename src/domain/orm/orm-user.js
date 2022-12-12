import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import deleteFile from '../../utils/middlewares/delete-file.js';
import { default as conn } from '../repositories/mongo.repository.js';
import {
  LogDanger,
  LogInfo,
  LogSuccess,
  LogWarning,
} from '../../utils/magic.js';
import { log } from 'config-yml';
import setCookie from '../../utils/helpers/tokenManipulation.js';
import { generateTokens } from './../../utils/helpers/generateTokens.js';

const db = conn.connMongo;

export const Create = async (req) => {
  try {
    const newUser = new db.User(req.body);

    const userExists = await db.User.findOne({ gmail: newUser.gmail });
    if (userExists) return LogDanger('That user already exists');

    newUser.password = bcrypt.hashSync(newUser.password, 6);

    if (req.file) {
      newUser.image = req.file.path;
    }

    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    LogDanger('User register failed', error);
    return await { error: { code: 123, message: error } };
  }
};

export const Login = async (req, res) => {
  try {
    const userInDB = await db.User.findOne({ gmail: req.body.gmail });

    if (!userInDB) return LogDanger("Login credentials doesn't exist");

    if (bcrypt.compareSync(req.body.password, userInDB.password)) {
      const { accessToken, refreshToken } = generateTokens(
        req,
        userInDB.role,
        userInDB
      );

      userInDB.password = null;

      setCookie(req, res, 'refreshToken', refreshToken);

      return { user: userInDB, token: accessToken };
    } else {
      return next('User password incorrect');
    }
  } catch (error) {
    LogDanger('User login failed', error);
    return await { error: { code: 123, message: error } };
  }
};

export const Logout = async (req, res) => {
  try {
    try {
      res.cookie('refreshToken', null);
    } catch (error) {
      console.log(error);
    }

    return 'User logout successfully';
  } catch (error) {
    LogDanger('User logout failed', error);
    return await { error: { code: 123, message: error } };
  }
};

export const GetAll = async () => {
  try {
    return await db.User.find();
  } catch (error) {
    LogDanger('Cannot getAll users', error);
    return await { error: { code: 123, message: error } };
  }
};

export const Update = async (req) => {
  try {
    const { id } = req.params;
    const user = new db.User(req.body);
    user._id = id;
    if (user.password) {
      user.password = bcrypt.hashSync(user.password, 6);
    }
    const updatedUser = await db.User.findByIdAndUpdate(id, user);
    return updatedUser;
  } catch (error) {
    console.log('error = ', error);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(await ResponseService('Failure', enum_.CRASH_LOGIC, 'error', ''));
  }
};

export const Delete = async (req) => {
  try {
    const { id } = req.params;
    const userDel = await db.User.findById(id);
    if (userDel.image) {
      deleteFile(userDel.image);
    }
    const deletedUser = await db.User.findByIdAndDelete(id);
    return deletedUser;
  } catch (error) {
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(await ResponseService('Failure', enum_.CRASH_LOGIC, 'error', ''));
  }
};

export const GetOne = async (req) => {
  try {
    const { id } = req.params;
    const user = await db.User.findById(id).populate(
      'players lineup competition'
    );
    console.log(user);
    return user;
  } catch (error) {
    console.log('error = ', error);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(await ResponseService('Failure', enum_.CRASH_LOGIC, 'error', ''));
  }
};

export const UpdateUsersPlayers = async (req) => {
  try {
    const { id } = req.params;
    const { player } = req.body;
    const updatedPlantilla = await db.User.findByIdAndUpdate(id, {
      $push: { players: player },
    });
    return updatedPlantilla;
  } catch (error) {
    console.log('error = ', error);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(await ResponseService('Failure', enum_.CRASH_LOGIC, 'error', ''));
  }
};

export const UpdateLineup = async (req) => {
  try {
    const { id } = req.params;
    const { line } = req.body;
    const playersUser = await db.User.findById(id);
    let savePlayers = playersUser.players;
    let linePlayers = playersUser.lineup;

    if (savePlayers.includes(line)) {
      if (linePlayers.length) {
        if (!linePlayers.includes(line)) {
          const updatedLineup = await db.User.findByIdAndUpdate(id, {
            $push: { lineup: line },
          });
          return updatedLineup;
        } else {
          LogDanger('That player already lineup');
          return await {
            error: { code: 123, message: 'That player already lineup' },
          };
        }
      } else {
        const updatedLineup = await db.User.findByIdAndUpdate(id, {
          $push: { lineup: line },
        });
        return updatedLineup;
      }
    } else {
      LogDanger('That player isnt you');
      return await {
        error: { code: 123, message: 'That player already lineup' },
      };
    }
  } catch (error) {
    console.log('error = ', error);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(await ResponseService('Failure', enum_.CRASH_LOGIC, 'error', ''));
  }
};

export const UpdateUsersPoints = async (req) => {
  try {
    const { id } = req.params;
    const users = await db.Competition.findById(id);

    users.users.forEach((user) => {
      const extracLine = async () => {
        let totalPoints = 0;
        const line = await db.User.findById(user).populate('lineup');
        line.lineup.forEach((player) => {
          totalPoints += player.points;
        });
        const updatepoints = await db.User.findByIdAndUpdate(user, {
          $inc: { points: totalPoints },
        });
        return updatepoints;
      };

      extracLine();
    });
    return 'Funsiona';
  } catch (error) {
    console.log('error = ', error);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(await ResponseService('Failure', enum_.CRASH_LOGIC, 'error', ''));
  }
};

export const UpdatePlayersMoney = async (req) => {
  try {
    const { id } = req.params;
    const { money } = req.body;
    const playersUser = await db.User.findById(id);
    let userMoney = playersUser.money + money;

    const updatePlayersMoney = await db.User.findByIdAndUpdate(id, {
      $set: { money: userMoney },
    });
    return updatePlayersMoney;
  } catch (error) {
    console.log('error = ', error);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(await ResponseService('Failure', enum_.CRASH_LOGIC, 'error', ''));
  }
};

export const UpdateCompetition = async (req) => {
  try {
    const { id } = req.params;
    const { competition } = req.body;
    const updateCompetition = await db.User.findByIdAndUpdate(id, {
      $set: { competitions: competition },
    });
    return updateCompetition;
  } catch (error) {
    console.log('error = ', error);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(await ResponseService('Failure', enum_.CRASH_LOGIC, 'error', ''));
  }
};

export const UpdateRole = async (req) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const updateRole = await db.User.findByIdAndUpdate(id, {
      $set: { role: role },
    });
    return updateRole;
  } catch (error) {
    console.log('error = ', error);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(await ResponseService('Failure', enum_.CRASH_LOGIC, 'error', ''));
  }
};

export const InicialPlayers = async (req) => {
  try {
    const { id } = req.params;
    const selectUser = await db.User.findById(id).populate('competition');
    const competitionId = selectUser.competition;
    const allUser = await db.User.find();
    const allPlayers = await db.Player.find();
    const marketPlasyers = await db.Competition.findById(competitionId);
    let disablePlayers = marketPlasyers.market;
    allUser.forEach((oneUser) => {
      if (oneUser.players) {
        oneUser.players.forEach((player) => {
          disablePlayers.push(player);
        });
      }
    });
    const freePlayers = allPlayers.filter((player) => {
      let free = true;
      if (disablePlayers.includes(player._id)) free = false;
      return free;
    });
    const randomPlayers = freePlayers.sort(() => {
      return Math.random() - 0.5;
    });
    if (randomPlayers.length) {
      const playersUserUpdate = await db.User.findByIdAndUpdate(id, {
        $set: {
          players: randomPlayers.slice(0, 5),
        },
      });
      return playersUserUpdate;
    }
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

export const SellPlayer = async (req) => {
  try {
    const { id } = req.params;
    const { player } = req.body;

    const getUser = await db.User.findById(id).populate('players');
    const playerToSell = await db.Player.findById(player);
    const playerToSellValue = playerToSell.value;
    const reducedValue = playerToSellValue * 0.7;
    const newUserMoney = getUser.money + reducedValue;

    const updatePlayersAndMoney = await db.User.findByIdAndUpdate(
      id,
      {
        $pull: { players: player },
        $set: { money: newUserMoney },
      },
      { new: true }
    );
    return updatePlayersAndMoney;
  } catch (err) {
    console.log('err = ', err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(await ResponseService('Failure', enum_.CRASH_LOGIC, 'err', ''));
  }
};

export const changePlayerLineup = async (req) => {
  try {
    const { id } = req.params;
    const { currentPlayer, newPlayer } = req.body;
    const user = await db.User.findById(id).populate('players');

    const lineupUser = user.lineup;

    if (lineupUser.length) {
      if (lineupUser.length > 4) {
        if (!lineupUser.includes(newPlayer)) {
          const addPlayer = await db.User.findByIdAndUpdate(
            id,
            {
              $push: { lineup: newPlayer },
            },
            { new: true }
          );
          const removePlayer = await db.User.findByIdAndUpdate(
            id,
            {
              $pull: { lineup: currentPlayer },
            },
            { new: true }
          );
          console.log('ADD', addPlayer);
          console.log('Rem', removePlayer);
          return removePlayer;
        } else {
          LogDanger('That player already lineup.');
          return await {
            error: { code: 123, message: 'That player already lineup.' },
          };
        }
      } else {
        LogDanger('The lineup has already five player.');
        return await {
          error: { code: 123, message: 'That player already lineup.' },
        };
      }
    } else {
      LogDanger('Dont have players in your lineup');
      return await {
        error: { code: 123, message: 'That player already lineup' },
      };
    }
  } catch (err) {
    console.log('err = ', err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(await ResponseService('Failure', enum_.CRASH_LOGIC, 'err', ''));
  }
};

export const benchPlayer = async (req) => {
  try {
    const { id } = req.params;
    const user = await db.User.findById(id).populate('players lineup');
    const bench = user.players.filter((player) => {
      let free = true;
      user.lineup.forEach((lineupPlayer) => {
        if (lineupPlayer.nickname === player.nickname) free = false;
      });
      return free;
    });
    return bench;
  } catch (error) {
    LogDanger('Cannot update the bench', error);
    return await { error: { code: 123, message: error } };
  }
};
