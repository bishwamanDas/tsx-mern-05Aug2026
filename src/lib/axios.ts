import axios from 'axios';

export const swapiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SWAPI_URL || 'https://swapi.dev/api',
  timeout: 15000,
});
