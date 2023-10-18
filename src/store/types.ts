export const FETCH_LIST = 'FETCH_LIST';
export const CREATE_LIST = 'CREATE_LIST';
export const DELETE_LIST = 'DELETE_LIST';
export const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS';
export const CREATE_LIST_SUCCESS = 'CREATE_LIST_SUCCESS';
export const API_ERROR = 'API_ERROR';

export interface Action {
  type: string;
  payload?: any;
}

export type listType = {
  id: number;
  name: string;
  description: string;
};

export interface RootState {
  lists: listType[];
  loading?: boolean;
  error?: string;
  totalPages?: number;
  currentPage?: number;
}

export const initialState: RootState = {
  lists: [],
  loading: false,
  error: '',
  currentPage: 1,
};
