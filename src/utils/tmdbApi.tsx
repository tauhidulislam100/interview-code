import axios from 'axios';

const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    session_id: 'dde06139373c7b9299d9871ed07a8f4ebc528208',
    api_key: 'bbe220c0cdf3879ab4296132d5764264',
  },
});

const ACCOUNT_ID = 8487708;

export {tmdbApi, ACCOUNT_ID};
