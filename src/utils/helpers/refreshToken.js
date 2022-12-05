import jwt from 'jsonwebtoken';

import { default as conn } from '../../domain/repositories/mongo.repository.js';
import setCookie from './tokenManipulation.js';
import { LogDanger } from './../magic.js';

const db = conn.connMongo;

const refreshToken = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db.User.findById(id);

    if (user.role === 'user') {
      try {
        await jwt.verify(
          req.cookies.userRefreshToken,
          req.app.get('userRefreshToken')
        );

        const newToken = jwt.sign({ ...user }, req.app.get('userToken'), {
          expiresIn: parseInt(req.app.get('tokenExpireTime')),
        });
        const newRefreshToken = jwt.sign(
          { ...user },
          req.app.get('userRefreshToken'),
          { expiresIn: parseInt(req.app.get('refreshExpireTime')) }
        );

        setCookie(req, res, 'userRefreshToken', newRefreshToken);

        return res.status(200).send({ token: newToken });
      } catch (error) {
        LogDanger('User refresh token has expired or has been revoked', error);
        return await { error: { code: 123, message: error } };
      }
    }

    try {
      console.log('TRY');
      // console.log(req[[Symbol(kHeaders)]].cookie);
      console.log(req.cookies.adminRefreshToken);
      await jwt.verify(
        req.cookies.adminRefreshToken,
        req.app.get('adminRefreshToken')
      );
      console.log('verified');
      const newToken = jwt.sign({ ...user }, req.app.get('adminToken'), {
        expiresIn: parseInt(req.app.get('tokenExpireTime')),
      });
      const newRefreshToken = jwt.sign(
        { ...user },
        req.app.get('adminRefreshToken'),
        { expiresIn: parseInt(req.app.get('refreshExpireTime')) }
      );
      console.log('newRefreshToken', newRefreshToken);
      setCookie(req, res, 'adminRefreshToken', newRefreshToken);
      console.log('cookie saved');
      return res.status(200).send({ token: newToken });
    } catch (error) {
      LogDanger('Admin refresh token has expired or has been revoked', error);
      return await { error: { code: 123, message: error } };
    }
  } catch (error) {
    LogDanger('Cannot refresh the token', error);
    return await { error: { code: 123, message: error } };
  }
};

export default refreshToken;
