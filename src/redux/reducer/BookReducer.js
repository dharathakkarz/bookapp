

import { FETCH_BOOKS, FETCH_BOOKS_DONE, FETCH_BOOKS_FAIL, ADDCART } from '../../constant/ActionType';

const initialState = {
  books: [],
  loading: false,
  error: null,
  cart: [],
};

const findItemIndexById = (cart, itemId) => {
  return cart.findIndex(item => item.id === itemId);
};

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKS:
      return { ...state, loading: true };
    case FETCH_BOOKS_DONE:
      return { ...state, loading: false, books: action.payload, error: null };
    case FETCH_BOOKS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ADDCART:
      const { id, quantity } = action.payload;
      const existingIndex = findItemIndexById(state.cart, id);
      if (existingIndex !== -1) {
        // If item already exists, update its quantity
        const updatedCart = [...state.cart];
        updatedCart[existingIndex].quantity += quantity;
        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        // If item doesn't exist, add it to the cart
        return {
          ...state,
          cart: [...state.cart, action.payload],
        };
      }
    default:
      return state;
  }
};

export default bookReducer;