import { jwt } from 'jsonwebtoken';

import setError from '../helpers/error';

const isLogged = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) return res.json(setError(401, 'Not authorized'));

  const splits = authorization.split(' ');

  if (splits.length != 2 || splits[0] != 'Bearer')
    return res.json(setError(400, 'Not Bearer'));

  const jwtStringify = splits[1];

  try {
    var token = jwt.verify(jwtStringify, req.app.get('userSecretKey'));
  } catch (err) {
    return res.json(setError(500, 'Token invalid'));
  }

  const authority = {
    id: token.id,
    name: token.name,
  };

  req.authority = authority;

  next();
};

export default isLogged
