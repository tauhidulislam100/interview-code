import {reducer} from './store';
import {
  FETCH_LIST,
  FETCH_LIST_SUCCESS,
  API_ERROR,
  Action,
  RootState,
} from './types';

// I just wrote test for the reducer only if you want more, I will add more tests

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {} as Action)).toEqual({
      lists: [],
      loading: false,
      error: '',
    });
  });

  it('should handle FETCH_LIST', () => {
    const initialState: RootState = {
      lists: [],
      loading: false,
      error: '',
    };
    expect(
      reducer(initialState, {
        type: FETCH_LIST,
      }),
    ).toEqual({
      lists: [],
      loading: true,
      error: '',
    });
  });

  it('should handle FETCH_LIST_SUCCESS', () => {
    const initialState: RootState = {
      lists: [],
      loading: true,
      error: '',
    };
    expect(
      reducer(initialState, {
        type: FETCH_LIST_SUCCESS,
        payload: ['list1', 'list2'],
      }),
    ).toEqual({
      lists: ['list1', 'list2'],
      loading: false,
      error: '',
    });
  });

  it('should handle API_ERROR', () => {
    const initialState: RootState = {
      lists: [],
      loading: true,
      error: '',
    };
    expect(
      reducer(initialState, {
        type: API_ERROR,
        payload: 'Error message',
      }),
    ).toEqual({
      lists: [],
      loading: false,
      error: 'Error message',
    });
  });
});
