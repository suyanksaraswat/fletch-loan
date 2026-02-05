import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';


export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

axiosClient.interceptors.request.use(
  async function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const res = error.response;
    if (res && res.data?.custom_code === 1002) {


      signOut({
        callbackUrl: '/',
        redirect: true,
      });
    }

    return Promise.reject(error);
  },
);
