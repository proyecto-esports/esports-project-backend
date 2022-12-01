import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { default as conn } from '../repositories/mongo.repository.js';
import { LogDanger } from '../../utils/magic.js';

const db = conn.connMongo;

export const Create = async (req) => {
  try {
    const newPlayer = new db.Player(req.body);
    const playerExists = await db.Player.findOne({
      nickname: newUser.nickname,
    });
    if (playerExists) return LogDanger('That player already exists');
  } catch (error) {
    LogDanger('User register failed', err);
    return await { err: { code: 123, message: err } };
  }
};
