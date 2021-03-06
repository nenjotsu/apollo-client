import jsonwebtoken from 'jsonwebtoken';
import * as routes from '../constants/routes';

export const getCookie = name => {
  const value = `; ${window.document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const result = parts
      .pop()
      .split(';')
      .shift();
    return result;
  }
  return '';
};

export const deleteCookie = name => {
  window.document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

export const isJwtTokenExpired = expiresAt => {
  const currentTime = Math.floor(new Date().getTime() / 1000);
  const isexp = currentTime > expiresAt;
  if (isexp) {
    return true;
  }
  return false;
};

export const getAccessToken = () => {
  const accessToken = getCookie('token');
  if (accessToken) {
    return accessToken;
  }
  return null;
};

export const hasAccessToken = () => {
  const accessToken = getCookie('token');
  if (accessToken) {
    return true;
  }
  return false;
};

export const checkTokenExpired = history => {
  const TOKEN = getAccessToken();

  if (TOKEN) {
    const decoded = jsonwebtoken.decode(TOKEN);
    const isJwtExpired = isJwtTokenExpired(decoded.exp);
    if (isJwtExpired) {
      deleteCookie('token');
    }
  } else {
    history.push(routes.SIGN_IN);
  }
};

export const checkTokenExpiredInSignIn = history => {
  const TOKEN = getAccessToken();
  if (TOKEN) {
    const decoded = jsonwebtoken.decode(TOKEN);
    const isJwtExpired = isJwtTokenExpired(decoded.exp);
    if (isJwtExpired) {
      deleteCookie('token');
    }
    if (!isJwtExpired && history.location.pathname !== routes.LANDING) {
      if (decoded.role === 'admin') {
        history.push(routes.UNIT);
      }
      if (decoded.role === 'standard') {
        history.push(routes.SOA);
      }
    }
  }
};
