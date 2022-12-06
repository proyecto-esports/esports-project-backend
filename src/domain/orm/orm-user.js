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

const db = conn.connMongo;

export const Create = async (req) => {
  try {
    const newUser = new db.User(req.body);
    const userNickname = await db.User.findOne({ nickname: newUser.nickname });
    const userGmail = await db.User.findOne({ gmail: newUser.gmail });
    const userExists = userNickname || userGmail;
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
    const userByGmail = await db.User.findOne({ gmail: req.body.gmail });

    const userInDB = userByNickname || userByGmail;
    if (!userInDB) return LogDanger("Login credentials doesn't exist");

    if (bcrypt.compareSync(req.body.password, userInDB.password)) {
      if (userInDB.role === 'user') {
        const userToken = jwt.sign(
          { ...userInDB },
          req.app.get('userTokenKey'),
          {
            expiresIn: parseInt(req.app.get('tokenExpireTime')),
          }
        );
        const userRefreshToken = jwt.sign(
          { ...userInDB },
          req.app.get('userRefreshTokenKey'),
          {
            expiresIn: parseInt(req.app.get('refreshExpireTime')),
          }
        );

        userInDB.password = null;

        setCookie(req, res, 'userRefreshToken', userRefreshToken);

        return { user: userInDB, token: userToken };
      }

      const adminToken = jwt.sign(
        { ...userInDB },
        req.app.get('adminTokenKey'),
        {
          expiresIn: parseInt(req.app.get('tokenExpireTime')),
        }
      );
      const adminRefreshToken = jwt.sign(
        { ...userInDB },
        req.app.get('adminRefreshTokenKey'),
        {
          expiresIn: parseInt(req.app.get('refreshExpireTime')),
        }
      );

      userInDB.password = null;

      setCookie(req, res, 'adminRefreshToken', adminRefreshToken);

      return { user: userInDB, token: adminToken };
    } else {
      return next('User password incorrect');
    }
  } catch (error) {
    LogDanger('User login failed', error);
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
    console.log(userDel.image);
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
    const user = await db.User.findById(id);
    return user;
  } catch (error) {
    console.log('error = ', error);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(await ResponseService('Failure', enum_.CRASH_LOGIC, 'error', ''));
  }
};

export const UpdatePlayers = async (req) => {
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

export const UpdatePlayersPoints = async (req) => {
  try {
    const { id } = req.params;
    const { point } = req.body;
    const playersUser = await db.User.findById(id);
    let userPoints = playersUser.points + point;
    const updatePlayersPoints = await db.User.findByIdAndUpdate(id, {
      $set: { points: userPoints },
    });
    return updatePlayersPoints;
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
