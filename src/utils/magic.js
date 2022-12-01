import * as enum_ from './enum.js';

export const ResponseService = async (status, errorCode, message, data) => {
  return await {
    status: status,
    info: {
      errorCode: errorCode,
      message: message,
      data: data,
    },
  };
};

export const LogSuccess = (msg) => {
  console.log(enum_.GREEN_LOG, msg);
};
export const LogInfo = (msg) => {
  console.log(enum_.CYAN_LOG, msg);
};
export const LogWarning = (msg) => {
  console.log(enum_.YELLOW_LOG, msg);
};
export const LogDanger = (msg) => {
  console.log(enum_.RED_LOG, msg);
};
