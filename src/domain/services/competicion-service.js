import { ResponseService } from '../../utils/magic.js';
import * as enum_ from '../../utils/enum.js';
import { LogDanger } from '../../utils/magic.js';
import * as ormCompetition from '../orm/competicion-orm.js';

export const GetAll = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    let resOrm = await ormCompetition.GetAll();
    if (resOrm.err) {
      (status = 'Failure'),
        (errorcode = resOrm.err.code),
        (message = resOrm.err.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Success GetAll competitions'),
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
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    const { name } = req.body;
    if (name) {
      let resOrm = await ormCompetition.Create(req.body);

      if (resOrm.error) {
        (status = 'Failure'),
          (errorcode = resOrm.error.code),
          (message = resOrm.err.message),
          (statuscode = enum_.CODE_BAD_REQUEST);
      } else {
        (message = 'Sucess create competitions'),
          (data = resOrm),
          (statuscode = enum_.CODE_CREATED);
        console.log(data);
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
    let resOrm = await ormCompetition.GetOne(req);
    if (resOrm.error) {
      (status = 'Failure'),
        (message = resOrm.err.message),
        (errorcode = resOrm.error.code),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Sucess GetOne competitions'),
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

export const GetName = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    let resOrm = await ormCompetition.GetName(req);
    if (resOrm.err) {
      (status = 'Failure'),
        (errorcode = resOrm.err.code),
        (message = resOrm.err.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Success GetName competition'),
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
    console.log(req.body);
    let resOrm = await ormCompetition.Update(req);
    if (resOrm.error) {
      (status = 'Failure'),
        (errorcode = resOrm.error.code),
        (message = resOrm.err.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Sucess Update competitions'),
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

export const UpdateUsers = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    let resOrm = await ormCompetition.UpdateUsers(req);

    if (resOrm.error) {
      (status = 'Failure'),
        (errorcode = resOrm.error.code),
        (message = resOrm.err.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Sucess Update users of competition'),
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

export const UpdateMarket = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    let resOrm = await ormCompetition.UpdateMarket(req);

    if (resOrm.error) {
      (status = 'Failure'),
        (errorcode = resOrm.error.code),
        (message = resOrm.err.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Sucess Update market of competition'),
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
    let resOrm = await ormCompetition.Delete(req);
    if (resOrm.error) {
      (status = 'Failure'),
        (errorcode = resOrm.error.code),
        (message = resOrm.err.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Sucess Delete competitions'),
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
