const setError = (code, message) => {
  console.log(code, message);
  const err = new Error();

  err.code = code;
  err.message = message;
  return err;
};

export default setError;
