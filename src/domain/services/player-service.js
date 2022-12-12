import * as ormPlayer from '../orm/player-orm.js';
import * as enum_ from '../../utils/enum.js';

import { ResponseService, LogDanger } from './../../utils/magic.js';

export const Create = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    let resOrm = await ormPlayer.Create(req);
    if (resOrm.error) {
      (status = 'Failure'),
        (errorcode = resOrm.error.code),
        (message = resOrm.error.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Success Create player'),
        (data = resOrm),
        (statuscode = enum_.CODE_CREATED);
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

export const GetAll = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    let resOrm = await ormPlayer.GetAll(req);
    if (resOrm.error) {
      (status = 'Failure'),
        (errorcode = resOrm.error.code),
        (message = resOrm.error.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Success GetAll players'),
        (data = resOrm),
        (statuscode = enum_.CODE_OK);
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

export const GetOne = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    let resOrm = await ormPlayer.GetOne(req);
    if (resOrm.error) {
      (status = 'Failure'),
        (errorcode = resOrm.error.code),
        (message = resOrm.error.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Success get player'),
        (data = resOrm),
        (statuscode = enum_.CODE_OK);
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
    let resOrm = await ormPlayer.Delete(req);
    if (resOrm.error) {
      (status = 'Failure'),
        (errorcode = resOrm.error.code),
        (message = resOrm.error.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Success delete player'),
        (data = resOrm),
        (statuscode = enum_.CODE_OK);
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
    let resOrm = await ormPlayer.Update(req);
    if (resOrm.error) {
      (status = 'Failure'),
        (errorcode = resOrm.error.code),
        (message = resOrm.error.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Success update player'),
        (data = resOrm),
        (statuscode = enum_.CODE_OK);
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

export const ChangePoints = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    let resOrm = await ormPlayer.ChangePoints(req);
    if (resOrm.err) {
      (status = 'Failure'),
        (errorcode = resOrm.err.code),
        (message = resOrm.err.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Success update player'),
        (data = resOrm),
        (statuscode = enum_.CODE_OK);
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

export const AddBid = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    const { user, money } = req.body;
    if (user && money) {
      let resOrm = await ormPlayer.AddBid(req);
      if (resOrm.error) {
        (status = 'Failure'),
          (errorcode = resOrm.error.code),
          (message = resOrm.error.message),
          (statuscode = enum_.CODE_BAD_REQUEST);
      } else {
        (message = 'Success bid added to player'),
          (data = resOrm),
          (statuscode = enum_.CODE_OK);
      }
    } else {
      (message = 'Required fields incomplete'),
        (statuscode = enum_.CODE_BAD_REQUEST);
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
