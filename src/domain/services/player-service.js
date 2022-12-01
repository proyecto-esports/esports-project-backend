import * as ormPlayer from '../orm/player-orm.js';

import { ResponseService, LogDanger } from './../../utils/magic.js';

export const Create = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    let resOrm = await ormPlayer.Create();
    if (resOrm.err) {
      (status = 'Failure'),
        (errorcode = resOrm.err.code),
        (message = resOrm.err.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Success Create player'),
        (data = resOrm),
        (statuscode = data.length > 0 ? enum_.CODE_OK : enum_.CODE_NO_CONTENT);
    }
    response = await ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (err) {
    LogDanger('err: ', err);
    response = await ResponseService(
      'Failure',
      enum_.CODE_BAD_REQUEST,
      err,
      ''
    );
    return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(response);
  }
};
