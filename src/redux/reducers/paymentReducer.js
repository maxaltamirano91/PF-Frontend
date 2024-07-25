import {
    PAYMENT_NOTIFICATION_FAILURE,   
    PAYMENT_NOTIFICATION_REQUEST,
    PAYMENT_NOTIFICATION_SUCCESS,
} from '../types';

const initialState = {
    loading: false,
    success: false,
    error: null,
  };
  
  const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
      case PAYMENT_NOTIFICATION_REQUEST:
        return { ...state, loading: true };
      case PAYMENT_NOTIFICATION_SUCCESS:
        return { ...state, loading: false, success: true, error: null };
      case PAYMENT_NOTIFICATION_FAILURE:
        return { ...state, loading: false, success: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default paymentReducer;