import {
  LogDanger,
  LogInfo,
  LogSuccess,
  LogWarning,
} from '../../utils/magic.js';
import { ResponseService } from '../../utils/magic.js';
import * as enum_ from '../../utils/enum.js';
import * as ormUser from '../orm/orm-user.js';

export const GetAll = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    let resOrm = await ormUser.GetAll();
    if (resOrm.error) {
      (status = 'Failure'),
        (errorcode = resOrm.error.code),
        (message = resOrm.error.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Success GetAll users'),
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
    const { username, gmail, password } = req.body;

    if (username && gmail && password) {
      let resOrm = await ormUser.Create(req);
      if (resOrm.error) {
        (status = 'Failure'),
          (errorcode = resOrm.error.code),
          (message = resOrm.error.messsage),
          (statuscode = enum_.CODE_BAD_REQUEST);
      } else {
        (message = 'User created'),
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
    console.log('error = ', error);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(await ResponseService('Failure', enum_.CRASH_LOGIC, 'error', ''));
  }
};

export const Login = async (req, res) => {
  let status = 'Success',
    errorcode = '',
    message = '',
    data = '',
    statuscode = 0,
    response = {};
  try {
    const { gmail, password } = req.body;
    if (gmail && password) {
      let resOrm = await ormUser.Login(req, res);
      if (resOrm.error) {
        (status = 'Failure'),
          (errorcode = resOrm.error.code),
          (message = resOrm.error.messsage),
          (statuscode = enum_.CODE_BAD_REQUEST);
      } else {
        (message = 'User logged'),
          (data = resOrm),
          (statuscode = enum_.CODE_CREATED);
      }
    } else {
      (status = 'Failure'),
        (errorcode = enum_.ERROR_REQUIRED_FIELD),
        (message = 'Required field incorrect'),
        (statuscode = enum_.CODE_BAD_REQUEST);
    }
    response = await ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (error) {
    console.log('error = ', error);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(await ResponseService('Failure', enum_.CRASH_LOGIC, 'error', ''));
  }
};

export const Logout = async (req, res) => {
  let status = 'Success',
    errorcode = '',
    message = '',
    data = '',
    statuscode = 0,
    response = {};
  try {
    let resOrm = await ormUser.Logout(req, res);
    if (resOrm.error) {
      (status = 'Failure'),
        (errorcode = resOrm.error.code),
        (message = resOrm.error.messsage),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Successful logout'),
        (data = resOrm),
        (statuscode = enum_.CODE_CREATED);
    }
    response = await ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (error) {
    console.log('error = ', error);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(await ResponseService('Failure', enum_.CRASH_LOGIC, 'error', ''));
  }
};

export const Update = async (req, res) => {
  let status = 'Success',
    errorcode = '',
    message = '',
    data = '',
    statuscode = 0,
    response = {};
  try {
    let resOrm = await ormUser.Update(req);
    if (resOrm.error) {
      (status = 'Failure'),
        (errorcode = resOrm.error.code),
        (message = resOrm.error.messsage),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'User updated'),
        (data = resOrm),
        (statuscode = enum_.CODE_CREATED);
    }
    response = await ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (error) {
    console.log('error = ', error);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(await ResponseService('Failure', enum_.CRASH_LOGIC, 'error', ''));
  }
};

export const Delete = async (req, res) => {
  let status = 'Success',
    errorcode = '',
    message = '',
    data = '',
    statuscode = 0,
    response = {};
  try {
    let resOrm = await ormUser.Delete(req);
    if (resOrm.error) {
      (status = 'Failure'),
        (errorcode = resOrm.error.code),
        (message = resOrm.error.messsage),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'User deleted'),
        (data = resOrm),
        (statuscode = enum_.CODE_CREATED);
    }
    response = await ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (error) {
    console.log('error = ', error);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(await ResponseService('Failure', enum_.CRASH_LOGIC, 'error', ''));
  }
};

export const GetOne = async (req, res) => {
  let status = 'Success',
    errorcode = '',
    message = '',
    data = '',
    statuscode = 0,
    response = {};
  try {
    let resOrm = await ormUser.GetOne(req);
    if (resOrm.error) {
      (status = 'Failure'),
        (errorcode = resOrm.error.code),
        (message = resOrm.error.messsage),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'User has been found'),
        (data = resOrm),
        (statuscode = enum_.CODE_CREATED);
    }
    response = await ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (error) {
    console.log('error = ', error);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(await ResponseService('Failure', enum_.CRASH_LOGIC, 'error', ''));
  }
};

export const UpdateUsersPlayers = async (req, res) => {
  let status = 'Success',
    errorcode = '',
    message = '',
    data = '',
    statuscode = 0,
    response = {};
  try {
    let resOrm = await ormUser.UpdateUsersPlayers(req);
    if (resOrm.error) {
      (status = 'Failure'),
        (errorcode = resOrm.error.code),
        (message = resOrm.error.messsage),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'User updated'),
        (data = resOrm),
        (statuscode = enum_.CODE_CREATED);
    }
    response = await ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (error) {
    console.log('error = ', error);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(await ResponseService('Failure', enum_.CRASH_LOGIC, 'error', ''));
  }
};

export const UpdateLineup = async (req, res) => {
  let status = 'Success',
    errorcode = '',
    message = '',
    data = '',
    statuscode = 0,
    response = {};
  try {
    let resOrm = await ormUser.UpdateLineup(req);
    if (resOrm.error) {
      (status = 'Failure'),
        (errorcode = resOrm.error.code),
        (message = 'That player already lineup'),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'User updated'),
        (data = resOrm),
        (statuscode = enum_.CODE_CREATED);
    }
    response = await ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (error) {
    console.log('error = ', error);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(await ResponseService('Failure', enum_.CRASH_LOGIC, 'error', ''));
  }
};

export const UpdatePlayersMoney = async (req, res) => {
  let status = 'Success',
    errorcode = '',
    message = '',
    data = '',
    statuscode = 0,
    response = {};
  try {
    let resOrm = await ormUser.UpdatePlayersMoney(req);
    if (resOrm.error) {
      (status = 'Failure'),
        (errorcode = resOrm.error.code),
        (message = 'That player already lineup'),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'User updated'),
        (data = resOrm),
        (statuscode = enum_.CODE_CREATED);
    }
    response = await ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (error) {
    console.log('error = ', error);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(await ResponseService('Failure', enum_.CRASH_LOGIC, 'error', ''));
  }
};

export const UpdateUsersPoints = async (req, res) => {
  let status = 'Success',
    errorcode = '',
    message = '',
    data = '',
    statuscode = 0,
    response = {};
  try {
    let resOrm = await ormUser.UpdateUsersPoints(req);
    if (resOrm.error) {
      (status = 'Failure'),
        (errorcode = resOrm.error.code),
        (message = 'That player already lineup'),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'User updated'),
        (data = resOrm),
        (statuscode = enum_.CODE_CREATED);
    }
    response = await ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (error) {
    console.log('error = ', error);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(await ResponseService('Failure', enum_.CRASH_LOGIC, 'error', ''));
  }
};

export const UpdateCompetition = async (req, res) => {
  let status = 'Success',
    errorcode = '',
    message = '',
    data = '',
    statuscode = 0,
    response = {};
  try {
    let resOrm = await ormUser.UpdateCompetition(req);
    if (resOrm.error) {
      (status = 'Failure'),
        (errorcode = resOrm.error.code),
        (message = resOrm.error.messsage),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'User updated'),
        (data = resOrm),
        (statuscode = enum_.CODE_CREATED);
    }
    response = await ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (error) {
    console.log('error = ', error);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(await ResponseService('Failure', enum_.CRASH_LOGIC, 'error', ''));
  }
};

export const UpdateRole = async (req, res) => {
  let status = 'Success',
    errorcode = '',
    message = '',
    data = '',
    statuscode = 0,
    response = {};
  try {
    let resOrm = await ormUser.UpdateRole(req);
    if (resOrm.error) {
      (status = 'Failure'),
        (errorcode = resOrm.error.code),
        (message = resOrm.error.messsage),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'User updated'),
        (data = resOrm),
        (statuscode = enum_.CODE_CREATED);
    }
    response = await ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (error) {
    console.log('error = ', error);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(await ResponseService('Failure', enum_.CRASH_LOGIC, 'error', ''));
  }
};

export const InicialPlayers = async (req, res) => {
  let status = 'Success',
    errorcode = '',
    message = '',
    data = '',
    statuscode = 0,
    response = {};
  try {
    let resOrm = await ormUser.InicialPlayers(req);
    if (resOrm.error) {
      (status = 'Failure'),
        (errorcode = resOrm.error.code),
        (message = resOrm.error.messsage),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'User updated'),
        (data = resOrm),
        (statuscode = enum_.CODE_CREATED);
    }
    response = await ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (error) {

    console.log('error = ', error);

    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(await ResponseService('Failure', enum_.CRASH_LOGIC, 'error', ''));
  }
};

export const SellPlayer = async (req, res) => {
  let status = 'Success',
    errorcode = '',
    message = '',
    data = '',
    statuscode = 0,
    response = {};
  try {
    let resOrm = await ormUser.SellPlayer(req);
    if (resOrm.error) {
      (status = 'Failure'),
        (errorcode = resOrm.error.code),
        (message = 'That player already lineup'),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'User updated'),
        (data = resOrm),
        (statuscode = enum_.CODE_CREATED);
    }
    response = await ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (error) {
    console.log('error = ', error);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(await ResponseService('Failure', enum_.CRASH_LOGIC, 'error', ''));
  }
};

export const changePlayerLineup = async (req, res) => {
  let status = 'Success',
    errorcode = '',
    message = '',
    data = '',
    statuscode = 0,
    response = {};
  try {
    let resOrm = await ormUser.changePlayerLineup(req);
    if (resOrm.error) {
      (status = 'Failure'),
        (errorcode = resOrm.error.code),
        (message = 'That player already lineup'),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Updated Lineup'),
        (data = resOrm),
        (statuscode = enum_.CODE_CREATED);
    }
    response = await ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (error) {
    console.log('errr = ', error);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(await ResponseService('Failure', enum_.CRASH_LOGIC, 'error', ''));
  }
};

export const JoinGroup = async (req, res) => {
  let status = 'Success',
    errorcode = '',
    message = '',
    data = '',
    statuscode = 0,
    response = {};
  try {
    let resOrm = await ormUser.JoinGroup(req, res);
    if (resOrm.err) {

      (status = 'Failure'),
        (errorcode = resOrm.error.code),
        (message = 'There is not such competition'),

        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'User updated'),
        (data = resOrm),
        (statuscode = enum_.CODE_CREATED);
    }
    response = await ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (error) {

    console.log('error = ', error);

    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(await ResponseService('Failure', enum_.CRASH_LOGIC, 'error', ''));
  }
};


export const benchPlayer = async (req, res) => {
  let status = 'Success',
    errorcode = '',
    message = '',
    data = '',
    statuscode = 0,
    response = {};
  try {
    let resOrm = await ormUser.benchPlayer(req);
    if (resOrm.error) {
      (status = 'Failure'),
        (errorcode = resOrm.error.code),
        (message = 'That player already bench'),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Updated Bench'),
        (data = resOrm),
        (statuscode = enum_.CODE_CREATED);
    }
    response = await ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (error) {
    console.log('error = ', error);
    return res
      .status(_enum.CODE_INTERNAL_SERVER_ERROR)
      .send(await ResponseService('Failure', enum_.CRASH_LOGIC, 'error', ''));
  }
};

export const CreateInvitationToGroup = async (req, res) => {
  let status = 'Success',
    errorcode = '',
    message = '',
    data = '',
    statuscode = 0,
    response = {};
  try {
    let resOrm = await ormUser.CreateInvitationToGroup(req);
    if (resOrm.error) {
      (status = 'Failure'),
        (errorcode = resOrm.error.code),
        (message = 'There is not such competition'),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'User updated'),
        (data = resOrm),
        (statuscode = enum_.CODE_CREATED);
    }
    response = await ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (error) {
    console.log('err = ', error);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(await ResponseService('Failure', enum_.CRASH_LOGIC, 'err', ''));
  }
};
