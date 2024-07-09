import axios from 'axios';

const API_URL = 'https://rickandmortyapi.com/api';

export const getEpisodes = (page = 1) => {
  return axios.get(`${API_URL}/episode?page=${page}`);
};

export const getEpisodeDetails = (id) => {
  return axios.get(`${API_URL}/episode/${id}`);
};

export const getCharacterDetails = (id) => {
  return axios.get(`${API_URL}/character/${id}`);
};
