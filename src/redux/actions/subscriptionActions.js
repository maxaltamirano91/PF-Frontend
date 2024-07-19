import axios from 'axios';
import {
    FETCH_PRODUCT_REQUEST,
    FETCH_PRODUCT_SUCCESS,
    CREATE_PREFERENCE_REQUEST,
    CREATE_PREFERENCE_SUCCESS,
    FETCH_ERROR,
} from "../types";

export const fetchProduct = () => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCT_REQUEST });
  try {
    const product = {
      title: 'Membresía Premium',
      quantity: 1,
      unit_price: 1
    };
    dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: product });
  } catch (error) {
    dispatch({ type: FETCH_ERROR, error: error.message });
  }
};

export const createPreference = (formData) => async (dispatch) => {
  dispatch({ type: CREATE_PREFERENCE_REQUEST });
  try {
    const response = await axios.post('payment/preference', formData);
    dispatch({ type: CREATE_PREFERENCE_SUCCESS, payload: response.data.preferenceId });
  } catch (error) {
    dispatch({ type: FETCH_ERROR, error: error.message });
  }
};
