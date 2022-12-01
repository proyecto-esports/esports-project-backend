import ResponseService from '../../utils/magic.js';
import * as enum_ from '../../utils/enum.js';
import { LogDanger } from '../../utils/magic.js';
import * as ormCompeticion from '../orm/competicion-orm.js';

export const GetAll = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    let resOrm = await ormCompeticion.GetAll();
    if (resOrm.error) {
      (status = 'Failure'),
        (errorcode = resOrm.error.code)((statuscode = enum_.CODE_BAD_REQUEST));
    } else {
      (message = 'Sucess GetAll competiciones')((data = resOrm)),
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
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    let resOrm = await ormCompeticion.GetAll();
    if (resOrm.error) {
      (status = 'Failure'),
        (errorcode = resOrm.error.code)((statuscode = enum_.CODE_BAD_REQUEST));
    } else {
      (message = 'Sucess GetAll competiciones')((data = resOrm)),
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

export const GetOne = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    let resOrm = await ormCompeticion.GetAll();
    if (resOrm.error) {
      (status = 'Failure'),
        (errorcode = resOrm.error.code)((statuscode = enum_.CODE_BAD_REQUEST));
    } else {
      (message = 'Sucess GetAll competiciones')((data = resOrm)),
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

export const GetName = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    let resOrm = await ormCompeticion.GetAll();
    if (resOrm.error) {
      (status = 'Failure'),
        (errorcode = resOrm.error.code)((statuscode = enum_.CODE_BAD_REQUEST));
    } else {
      (message = 'Sucess GetAll competiciones')((data = resOrm)),
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

export const Update = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    let resOrm = await ormCompeticion.GetAll();
    if (resOrm.error) {
      (status = 'Failure'),
        (errorcode = resOrm.error.code)((statuscode = enum_.CODE_BAD_REQUEST));
    } else {
      (message = 'Sucess GetAll competiciones')((data = resOrm)),
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

export const Delete = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    let resOrm = await ormCompeticion.GetAll();
    if (resOrm.error) {
      (status = 'Failure'),
        (errorcode = resOrm.error.code)((statuscode = enum_.CODE_BAD_REQUEST));
    } else {
      (message = 'Sucess GetAll competiciones')((data = resOrm)),
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
