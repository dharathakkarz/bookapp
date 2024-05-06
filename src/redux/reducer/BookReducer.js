
import { FETCH_BOOKS, FETCH_BOOKS_DONE, FETCH_BOOKS_FAIL } from '../../constant/ActionType';

const initialState = {
  books: [],
  loading: false,
  error: null
};

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKS:
      return { ...state, loading: true };
    case FETCH_BOOKS_DONE:
      return { ...state, loading: false, books: action.payload, error: null };
    case FETCH_BOOKS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default bookReducer;
