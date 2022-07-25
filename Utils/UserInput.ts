// import { isIP } from "validator/es/lib/isIp";

export const isValidUserName = (userName: string) => {
  if (userName === undefined) return false;
  return true;
};

export const isValidPassword = (password: string) => {
  if (password === undefined) return false;
  return true;
};

export const isValidToken = (token) => {
  return true;
};

export const isValidIpAddress = (ip) => {
  // return isIP(ip);
  return true;
};

export const parseBody = (body, paramsList): any => {
  if (body !== undefined) {
    const params = {};
    for (const param of paramsList) {
      if (body[param] == undefined) {
        throw new Error(`Invalid value for parameter '${param}'`);
      } else {
        params[param] = body[param];
      }
    }
    return params;
  } else {
    throw new Error("Invalid parameters");
  }
};
