import {
    FETCH_PRODUCT_REQUEST,
    FETCH_PRODUCT_SUCCESS,
    CREATE_PREFERENCE_REQUEST,
    CREATE_PREFERENCE_SUCCESS,
    CANCEL_SUBSCRIPTION_REQUEST,
    CANCEL_SUBSCRIPTION_SUCCESS,
    CANCEL_SUBSCRIPTION_FAILURE
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
      case CANCEL_SUBSCRIPTION_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case FETCH_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          product: action.payload
        };
      case CREATE_PREFERENCE_SUCCESS:
        return {
          ...state,
          loading: false,
          preferenceId: action.payload
        };
      case CANCEL_SUBSCRIPTION_SUCCESS:
        return {
          ...state,
          loading: false
        };
      case CANCEL_SUBSCRIPTION_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default subscriptionReducer;
  
  