import axios from 'axios';

const BASE_URL = 'https://14.design.htmlacademy.pro/six-cities/';
const REQUEST_TIMEOUT = 5000;

export const createAPI = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  return api;
};
