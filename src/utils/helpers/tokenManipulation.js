const setCookie = (req, res, key, value) => {
  const time = parseInt(req.app.get('tokenExpireTime'));
  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + time),
  };
  console.log('options ok');
  res.cookie(key, value, options);
  console.log('res ok');
};

export default setCookie;
