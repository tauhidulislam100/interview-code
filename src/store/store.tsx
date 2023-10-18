import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
} from 'redux';
import {createLogic, createLogicMiddleware} from 'redux-logic';
import {ACCOUNT_ID, tmdbApi} from '../utils/tmdbApi';
import {
  API_ERROR,
  CREATE_LIST,
  CREATE_LIST_SUCCESS,
  DELETE_LIST,
  FETCH_LIST,
  FETCH_LIST_SUCCESS,
  initialState,
  Action,
} from './types';
import {ArgumentAction} from 'redux-logic/definitions/action';

export const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case FETCH_LIST:
    case CREATE_LIST:
    case DELETE_LIST:
      return {...state, loading: true, error: ''};
    case FETCH_LIST_SUCCESS:
      return {...state, ...action.payload, loading: false};
    case CREATE_LIST_SUCCESS:
      return {...state, loading: false};
    case API_ERROR:
      return {...state, error: action.payload, loading: false};
    default:
      return state;
  }
};

const dispatchError = (
  error: any,
  dispatch: <T extends ArgumentAction>(action: T) => T,
) => {
  dispatch({
    type: API_ERROR,
    payload:
      error?.message ||
      error?.status_message ||
      'something went wrong unable to create list',
  });
};

const fetchListLogic = createLogic<Action>({
  type: FETCH_LIST,
  latest: true,
  async process({action}, dispatch, done) {
    const page = (action as Action).payload ?? 1;
    console.log(page);
    try {
      const {data} = await tmdbApi.get(
        `/account/${ACCOUNT_ID}/lists?page=${page}`,
      );
      dispatch({
        type: FETCH_LIST_SUCCESS,
        payload: {
          lists: data.results,
          totalPages: data.total_pages,
          currentPage: data.page,
        },
      });
    } catch (error) {
      dispatchError(error, dispatch);
    } finally {
      done();
    }
  },
});

const createListLogic = createLogic<Action>({
  type: CREATE_LIST,
  latest: true,
  async process({action}, dispatch, done) {
    try {
      await tmdbApi.post(`/list`, (action as Action).payload);
      dispatch({type: CREATE_LIST_SUCCESS});
    } catch (error) {
      dispatchError(error, dispatch);
    } finally {
      done();
    }
  },
});

const deleteListLogic = createLogic<Action>({
  type: DELETE_LIST,
  latest: true,
  async process({action}, dispatch, done) {
    try {
      await tmdbApi.delete(`/list/${(action as Action).payload}`);
      dispatch({type: FETCH_LIST});
    } catch (error) {
      // i don't know but for some reason tmdb api return 500 status even when request success
      dispatch({type: FETCH_LIST});
      dispatchError(error, dispatch);
    } finally {
      done();
    }
  },
});

const logics = [fetchListLogic, createListLogic, deleteListLogic];

const composeEnhancers =
  //@ts-ignore
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as typeof compose) || compose;
const logicMiddleware = createLogicMiddleware(logics);

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(logicMiddleware)),
);

export default store;
