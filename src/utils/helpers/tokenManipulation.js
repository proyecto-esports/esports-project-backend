const setCookie = (req, res, key, value) => {
  console.log("cookie fn");
  const time = parseInt(req.app.get('refreshExpireTime'));
  console.log("time");
  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + time * 1000),
  };
  res.cookie(key, value, options);
};

export default setCookie;
