import jwt from 'jsonwebtoken';

import { default as conn } from '../../domain/repositories/mongo.repository.js';
import setCookie from './tokenManipulation.js';
import { LogDanger } from './../magic.js';

const db = conn.connMongo;

const refreshToken = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db.User.findById(id);

    // Verificamos si el Refresh Token ha expirado o es válido
    await jwt.verify(
      req.cookies.refreshToken,
      req.app.get(user.role === 'user' ? 'userRefreshKey' : 'adminRefreshKey'),
      // Controlador de errores que aporta información más detallada que el Catch
      (error) => error && console.log(error)
    );
    // Generamos nuevos tokens de ambos tipos
    const { accessToken, refreshToken } = generateTokens(
      req,
      userInDB.role,
      userInDB
    );
    // Guardamos el Refresh Roken en una cookie con el ajuste de httpOnly,
    // evitando así el robo mediante scripts desde el lado del cliente
    setCookie(req, res, 'refreshToken', refreshToken);
    // Retornamos el nuevo Token de acceso al Frontend en la respuesta
    return res.status(200).send({ accessToken: accessToken });
  } catch (error) {
    LogDanger('Refresh token has expired or has been revoked', error);
    return await { error: { code: 123, message: error } };
  }
};

export default refreshToken;
