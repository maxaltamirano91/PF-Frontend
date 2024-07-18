import {
    FETCH_PRODUCT_REQUEST,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCT_FAILURE,
    CREATE_PREFERENCE_REQUEST,
    CREATE_PREFERENCE_SUCCESS,
    CREATE_PREFERENCE_FAILURE
  } from '../types/subscriptionTypes';
  
  const initialState = {
    product: null,
    loading: false,
    error: null,
    preferenceId: null
  };
  
  const subscriptionReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PRODUCT_REQUEST:
      case CREATE_PREFERENCE_REQUEST:
        return {
          ...state,
          loading: true
        };
      case FETCH_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          product: action.payload
        };
      case FETCH_PRODUCT_FAILURE:
      case CREATE_PREFERENCE_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error
        };
      case CREATE_PREFERENCE_SUCCESS:
        return {
          ...state,
          loading: false,
          preferenceId: action.payload
        };
      default:
        return state;
    }
  };
  
  export default subscriptionReducer;
  