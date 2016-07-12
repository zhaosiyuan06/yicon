import isonFetch from 'isom-fetch';
import {
  FETCH_HOME_DATA,
  FETCH_REPOSITORY_DATA,
  CLEAR_REPOSITORY_DATA,
} from '../constants/actionTypes';

const fetch = isonFetch.create({
  baseURL: '/api',
  thunk: true,
});

export function fetchHomeData() {
  return {
    type: FETCH_HOME_DATA,
    payload: fetch.get('/repositories'),
  };
}

function fetchRepository(id) {
  return {
    type: FETCH_REPOSITORY_DATA,
    payload: fetch.get(`/repositories/${id}`),
  };
}

export function clearRepositoryData() {
  return {
    type: CLEAR_REPOSITORY_DATA,
  };
}

export function fetchRepositoryData(id) {
  return (dispatch, getState) => {
    const { currRepository } = getState().repository;

    if (String(id) !== String(currRepository.id)) {
      dispatch(clearRepositoryData());
    }

    dispatch(fetchRepository(id));
  };
}
