import bcrypt from 'bcrypt';
import { Jwt } from 'jsonwebtoken';

import conn from '../repositories/mongo.repository';
import magic from '../../utils/magic';

const db = conn.db.connMongo;

export const Create = async (req) => {
  try {
    const newUser = new db.User(req.body);
    console.log(newUser);
    const userNickname = await db.User.findOne({ nickname: newUser.nickname });
    const userGmail = await db.User.findOne({ gmail: newUser.gmail });
    const userExists = userNickname || userGmail;
    if (userExists) return magic.LogDanger('That user already exists');
    newUser.password = bcrypt.hashSync(newUser.password, 6);
    if (req.file) {
      newUser.image = req.file.path;
    }

    const savedUser = await newUser.save();
    return savedUser;
  } catch (err) {
    magic.LogDanger('User register failed', err);
    return await { err: { code: 123, message: err } };
  }
};

export const Login = async (req) => {
  try {
    const userByNickname = await db.User.findOne({
      nickname: req.body.nickname,
    });
    const userByGmail = await db.User.findOne({ gmail: req.body.gmail });
    const userInDB = userByNickname || userByGmail;
    if (!userInDB) return magic.LogDanger("Login credentials doesn't exist");

    if (bcrypt.compareSync(req.body.password, userInDB.password)) {
      console.log(userInDB);
      const userToken = jwt.sign(
        { ...userInDB },
        req.app.get('userSecretKey'),
        {
          expiresIn: '1h',
        }
      );
      const adminToken = jwt.sign(
        { ...userInDB },
        req.app.get('adminSecretKey'),
        {
          expiresIn: '1h',
        }
      );

      userInDB.password = null;

      if (userInDB.role === 'admin') {
        return { user: userInDB, token: adminToken };
      } else {
        return { user: userInDB, token: userToken };
      }
    } else {
      return next('User password incorrect');
    }
  } catch (err) {
    magic.LogDanger('User login failed', err);
    return await { err: { code: 123, message: err } };
  }
};

export const GetAll = async () => {
  try {
    return await db.User.find().populate('department incidents');
  } catch (err) {
    magic.LogDanger('Cannot getAll users', err);
    return await { err: { code: 123, message: err } };
  }
};

export const Update = async (req) => {
  try {
    const { id } = req.params;
    const user = new db.User(req.body);
    user._id = id;
    user.password = bcrypt.hashSync(user.password, 6);
    const updatedUser = await db.User.findByIdAndUpdate(id, user);
    return updatedUser;
  } catch (err) {
    console.log('err = ', err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(
        await magic.ResponseService('Failure', enum_.CRASH_LOGIC, 'err', '')
      );
  }
};

export const Delete = async (req) => {
  try {
    const { id } = req.params;
    const deletedUser = await db.User.findByIdAndDelete(id);
    return deletedUser;
  } catch (err) {
    console.log('err = ', err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(
        await magic.ResponseService('Failure', enum_.CRASH_LOGIC, 'err', '')
      );
  }
};

export const GetOne = async (req) => {
  try {
    const { id } = req.params;
    const user = await db.User.findById(id);
    return user;
  } catch (err) {
    console.log('err = ', err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(
        await magic.ResponseService('Failure', enum_.CRASH_LOGIC, 'err', '')
      );
  }
};

export const GetNickname = async (req) => {
  try {
    const { nickname } = req.params;
    const user = await db.User.findOne({ nickname: nickname });
    return user;
  } catch (err) {
    console.log('err = ', err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(
        await magic.ResponseService('Failure', enum_.CRASH_LOGIC, 'err', '')
      );
  }
};
