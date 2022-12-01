import bcrypt from 'bcrypt';
import  jwt  from 'jsonwebtoken';

import  db  from '../repositories/mongo.repository.js';
import {LogDanger, LogInfo, LogSuccess, LogWarning} from '../../utils/magic.js';

const conn = db.connMongo;

export const Create = async (req) => {
  console.log('jola');
  try {
    const newUser = new conn.User(req.body);
    console.log(newUser);
    const userNickname = await conn.User.findOne({ nickname: newUser.nickname });
    const userGmail = await conn.User.findOne({ gmail: newUser.gmail });
    const userExists = userNickname || userGmail;
    if (userExists) return LogDanger('That user already exists');
    newUser.password = bcrypt.hashSync(newUser.password, 6);
    if (req.file) {
      newUser.image = req.file.path;
    }

    const savedUser = await newUser.save();
    return savedUser;
  } catch (err) {
    LogDanger('User register failed', err);
    return await { err: { code: 123, message: err } };
  }
};

export const Login = async (req) => {
  try {
    const userByNickname = await conn.User.findOne({
      nickname: req.body.nickname,
    });
    const userByGmail = await conn.User.findOne({ gmail: req.body.gmail });
    const userInconn = userByNickname || userByGmail;
    if (!userInconn) return LogDanger("Login credentials doesn't exist");

    if (bcrypt.compareSync(req.body.password, userInconn.password)) {
      console.log(userInconn);
      const userToken = jwt.sign(
        { ...userInconn },
        req.app.get('userSecretKey'),
        {
          expiresIn: '1h',
        }
      );
      const adminToken = jwt.sign(
        { ...userInconn },
        req.app.get('adminSecretKey'),
        {
          expiresIn: '1h',
        }
      );

      userInconn.password = null;

      if (userInconn.role === 'admin') {
        return { user: userInconn, token: adminToken };
      } else {
        return { user: userInconn, token: userToken };
      }
    } else {
      return next('User password incorrect');
    }
  } catch (err) {
    LogDanger('User login failed', err);
    return await { err: { code: 123, message: err } };
  }
};

export const GetAll = async () => {
  try {
    return await conn.User.find().populate('department incidents');
  } catch (err) {
    LogDanger('Cannot getAll users', err);
    return await { err: { code: 123, message: err } };
  }
};

export const Update = async (req) => {
  try {
    const { id } = req.params;
    const user = new conn.User(req.body);
    user._id = id;
    user.password = bcrypt.hashSync(user.password, 6);
    const updatedUser = await conn.User.finconnyIdAndUpdate(id, user);
    return updatedUser;
  } catch (err) {
    console.log('err = ', err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(
        await ResponseService('Failure', enum_.CRASH_LOGIC, 'err', '')
      );
  }
};

export const Delete = async (req) => {
  try {
    const { id } = req.params;
    const deletedUser = await conn.User.finconnyIdAndDelete(id);
    return deletedUser;
  } catch (err) {
    console.log('err = ', err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(
        await ResponseService('Failure', enum_.CRASH_LOGIC, 'err', '')
      );
  }
};

export const GetOne = async (req) => {
  try {
    const { id } = req.params;
    const user = await conn.User.finconnyId(id);
    return user;
  } catch (err) {
    console.log('err = ', err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(
        await ResponseService('Failure', enum_.CRASH_LOGIC, 'err', '')
      );
  }
};

export const GetNickname = async (req) => {
  try {
    const { nickname } = req.params;
    const user = await conn.User.findOne({ nickname: nickname });
    return user;
  } catch (err) {
    console.log('err = ', err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(
        await ResponseService('Failure', enum_.CRASH_LOGIC, 'err', '')
      );
  }
};
