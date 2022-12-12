import { ResponseService } from '../../utils/magic.js';
import * as enum_ from '../../utils/enum.js';
import * as ormBid from '../../domain/orm/orm-bid.js';
import { LogDanger } from '../../utils/magic.js';

export const GetAll = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    let resOrm = await ormBid.GetAll();
    if (resOrm.error) {
      (status = 'Failure'),
        (errorcode = resOrm.error.code),
        (message = resOrm.error.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Sucess GetAll bids'),
        (data = resOrm),
        (statuscode = data.length > 0 ? enum_.CODE_OK : enum_.CODE_NO_CONTENT);
    }
    response = await ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (error) {
    LogDanger('error: ', error);
    response = await ResponseService(
      'Failure',
      enum_.CODE_BAD_REQUEST,
      error,
      ''
    );
    return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(response);
  }
};

export const Create = async (req, res) => {
  let status = 'Success',
    errorcode = '',
    message = '',
    data = '',
    statuscode = 0,
    response = {};
  try {
    const { userId, money, playerId } = req.body;
    if (userId && money && playerId) {
      let resOrm = await ormBid.Create(req);
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
    response = await ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (error) {
    LogDanger('error = ', error);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(await ResponseService('Failure', enum_.CRASH_LOGIC, 'error', ''));
  }
};

export const DeleteAll = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    let resOrm = await ormBid.DeleteAll(req);
    console.log(resOrm);
    if (resOrm.error) {
      (status = 'Failure'),
        (errorcode = resOrm.error.code),
        (message = resOrm.error.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Success delete all bids'),
        (data = resOrm),
        (statuscode =
          Object.keys(data).length > 0 ? enum_.CODE_OK : enum_.CODE_NO_CONTENT);
    }
    response = await ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (error) {
    LogDanger('error: ', error);
    response = await ResponseService(
      'Failure',
      enum_.CODE_BAD_REQUEST,
      error,
      ''
    );
    return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(response);
  }
};

export const Delete = async (req, res) => {
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
      (message = 'Success delete bid'),
        (data = resOrm),
        (statuscode =
          Object.keys(data).length > 0 ? enum_.CODE_OK : enum_.CODE_NO_CONTENT);
    }
    response = await ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (error) {
    LogDanger('error: ', error);
    response = await ResponseService(
      'Failure',
      enum_.CODE_BAD_REQUEST,
      error,
      ''
    );
    return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(response);
  }
};

export const Update = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    let resOrm = await ormBid.Update(req);
    if (resOrm.error) {
      (status = 'Failure'),
        (errorcode = resOrm.error.code),
        (message = resOrm.error.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Bids updated successfully'),
        (data = resOrm),
        (statuscode =
          Object.keys(data).length > 0 ? enum_.CODE_OK : enum_.CODE_NO_CONTENT);
    }
    response = await ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (error) {
    LogDanger('error: ', error);
    response = await ResponseService(
      'Failure',
      enum_.CODE_BAD_REQUEST,
      error,
      ''
    );
    return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(response);
  }
};

export const RenewBid = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    let resOrm = await ormBid.RenewBid(req);
    if (resOrm.error) {
      (status = 'Failure'),
        (errorcode = resOrm.error.code),
        (message = resOrm.error.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Bids updated successfully'),
        (data = resOrm),
        (statuscode =
          Object.keys(data).length > 0 ? enum_.CODE_OK : enum_.CODE_NO_CONTENT);
    }
    response = await ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (error) {
    LogDanger('error: ', error);
    response = await ResponseService(
      'Failure',
      enum_.CODE_BAD_REQUEST,
      error,
      ''
    );
    return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(response);
  }
};

export const RenewBid = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    let resOrm = await ormBid.RenewBid(req);
    if (resOrm.error) {
      (status = 'Failure'),
        (errorcode = resOrm.error.code),
        (message = resOrm.err.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Success update bids'),
        (data = resOrm),
        (statuscode =
          Object.keys(data).length > 0 ? enum_.CODE_OK : enum_.CODE_NO_CONTENT);
    }
    response = await ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (error) {
    LogDanger('error: ', error);
    response = await ResponseService(
      'Failure',
      enum_.CODE_BAD_REQUEST,
      error,
      ''
    );
    return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(response);
  }
};
