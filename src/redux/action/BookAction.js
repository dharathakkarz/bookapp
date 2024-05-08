
import axios from 'axios';
import { FETCH_BOOKS, FETCH_BOOKS_DONE, FETCH_BOOKS_FAIL, ADDCART } from '../../constant/ActionType';

export const fetchBooks = () => {
  return async dispatch => {
    dispatch({ type: FETCH_BOOKS });
    try {
      const response = await axios.get('https://freetestapi.com/api/v1/books');
      dispatch({ type: FETCH_BOOKS_DONE, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_BOOKS_FAIL, payload: error.message });
    }
  };
};

export const addToCart = (item) => ({
  type: ADDCART,
  payload: item 
});

