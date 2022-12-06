import jwt from 'jsonwebtoken';

import { default as conn } from '../../domain/repositories/mongo.repository.js';
import setCookie from './tokenManipulation.js';
import { LogDanger } from './../magic.js';

const db = conn.connMongo;

const refreshToken = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db.User.findById(id);

    // USER role
    if (user.role === 'user') {
      try {
        // Verificamos si el Refresh Token ha expirado o es válido
        await jwt.verify(
          req.cookies.userRefreshToken,
          req.app.get('userRefreshTokenKey'),
          // Controlador de errores que aporta información más detallada que el Catch
          (error) => error && console.log(error)
        );
        // Generamos nuevos tokens de ambos tipos
        const newToken = jwt.sign({ ...user }, req.app.get('userTokenKey'), {
          expiresIn: parseInt(req.app.get('tokenExpireTime')),
        });
        const newRefreshToken = jwt.sign(
          { ...user },
          req.app.get('userRefreshTokenKey'),
          { expiresIn: parseInt(req.app.get('refreshExpireTime')) }
        );
        // Guardamos el Refresh Roken en una cookie con el ajuste de httpOnly,
        // evitando así el robo mediante scripts desde el lado del cliente
        setCookie(req, res, 'userRefreshToken', newRefreshToken);
        // Retornamos el nuevo Token de acceso al Frontend en la respuesta
        return res.status(200).send({ token: newToken });
      } catch (error) {
        LogDanger('User refresh token has expired or has been revoked', error);
        return await { error: { code: 123, message: error } };
      }
    }

    // ADMIN role
    try {
      await jwt.verify(
        req.cookies.adminRefreshToken,
        req.app.get('adminRefreshTokenKey'),
        (error) => error && console.log(error)
      );

      const newToken = jwt.sign({ ...user }, req.app.get('adminTokenKey'), {
        expiresIn: parseInt(req.app.get('tokenExpireTime')),
      });
      const newRefreshToken = jwt.sign(
        { ...user },
        req.app.get('adminRefreshTokenKey'),
        { expiresIn: parseInt(req.app.get('refreshExpireTime')) }
      );

      setCookie(req, res, 'adminRefreshToken', newRefreshToken);

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
