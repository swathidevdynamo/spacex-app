import axios from 'axios';

export default defineNuxtPlugin(() => {
  const api = axios.create({
    baseURL: 'https://api.spacexdata.com/v4', // Base URL for API requests
  });

  return {
    provide: {
      api,
    },
  };
});