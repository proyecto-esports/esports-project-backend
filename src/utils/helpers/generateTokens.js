import jwt from 'jsonwebtoken';

export const generateTokens = (req, role, user) => {
  if (role === 'user') return userTokens(req, user);
  return adminTokens(req, user);
};

const userTokens = (req, user) => {
  const accessToken = jwt.sign({ ...user }, req.app.get('userAccessKey'), {
    expiresIn: parseInt(req.app.get('accessExpireTime')),
  });

  const refreshToken = jwt.sign({ ...user }, req.app.get('userRefreshKey'), {
    expiresIn: parseInt(req.app.get('refreshExpireTime')),
  });
  
  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};

const adminTokens = (req, user) => {
  const accessToken = jwt.sign({ ...user }, req.app.get('adminAccessKey'), {
    expiresIn: parseInt(req.app.get('accessExpireTime')),
  });

  const refreshToken = jwt.sign({ ...user }, req.app.get('adminRefreshKey'), {
    expiresIn: parseInt(req.app.get('refreshExpireTime')),
  });

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};
