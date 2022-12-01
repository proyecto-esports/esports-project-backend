import magic from '../../utils/magic.js';
import enum_ from '../../utils/enum.js';
import ormBid from '../../domain/orm/orm-bid.js';

exports.Create = async (req, res) => {
  let status = 'Success',
    errorcode = '',
    message = '',
    data = '',
    statuscode = 0,
    response = {};
  try {
    const { user, money } = req.body;
    if (user && money) {
      let resOrm = await ormBid.Create(req.body);
      if (resOrm.error) {
        (status = 'Failure'),
          (errorcode = resOrm.error.code),
          (message = resOrm.error.messsage),
          (statuscode = enum_.CODE_BAD_REQUEST);
      } else {
        (message = 'Bid created'),
          (data = resOrm),
          (statuscode = enum_.CODE_CREATED);
      }
    } else {
      (status = 'Failure'),
        (errorcode = enum_.ERROR_REQUIRED_FIELD),
        (message = 'Required fields incompleted'),
        (statuscode = enum_.CODE_BAD_REQUEST);
    }
    response = await magic.ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (error) {
    console.log('error = ', error);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(
        await magic.ResponseService('Failure', enum_.CRASH_LOGIC, 'error', '')
      );
  }
};

exports.Delete = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    let resOrm = await ormBid.Delete(req);
    console.log(resOrm);
    if (resOrm.error) {
      (status = 'Failure'),
        (errorcode = resOrm.error.code),
        (message = resOrm.error.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Success updated bid'),
        (data = resOrm),
        (statuscode =
          Object.keys(data).length > 0 ? enum_.CODE_OK : enum_.CODE_NO_CONTENT);
    }
    response = await magic.ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (error) {
    magic.LogDanger('error: ', error);
    response = await magic.ResponseService(
      'Failure',
      enum_.CODE_BAD_REQUEST,
      error,
      ''
    );
    return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(response);
  }
};
