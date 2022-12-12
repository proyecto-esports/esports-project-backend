const setCookie = (req, res, key, value) => {
  const time = parseInt(req.app.get('refreshExpireTime'));

  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + time * 1000),
  };
  
  res.cookie(key, value, options);
};

export default setCookie;
