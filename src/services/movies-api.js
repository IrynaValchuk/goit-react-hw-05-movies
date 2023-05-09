import axios from 'axios';
import { BASE_URL, API_KEY } from 'constants';
import {
  transformMovies,
  transformMovie,
  transformMovieCast,
  transformMovieReviews,
} from 'helpers';

export const getPopularMovies = async () => {
  return await axios
    .get(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`)
    .then(({ data }) => transformMovies(data.results));
};

export const getSearchMovie = async movieName => {
  return await axios
    .get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${movieName}`)
    .then(({ data }) => transformMovies(data.results));
};

export const getMovieById = async movieId => {
  return await axios
    .get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`)
    .then(({ data }) => transformMovie(data));
};

export const getMovieCast = async movieId => {
  return await axios
    .get(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`)
    .then(({ data }) => transformMovieCast(data.cast));
};

export const getMovieReviews = async movieId => {
  return await axios
    .get(`${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`)
    .then(({ data }) => transformMovieReviews(data.results));
};
