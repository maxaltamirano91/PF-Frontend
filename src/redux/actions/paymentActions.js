import axios from 'axios';

import {
    PAYMENT_NOTIFICATION_FAILURE,   
    PAYMENT_NOTIFICATION_REQUEST,
    PAYMENT_NOTIFICATION_SUCCESS,
} from '../types/paymentTypes';

const paymentNotificationRequest = () => ({
  type: PAYMENT_NOTIFICATION_REQUEST,
});

const paymentNotificationSuccess = (data) => ({
  type: PAYMENT_NOTIFICATION_SUCCESS,
  payload: data,
});

const paymentNotificationFailure = (error) => ({
  type: PAYMENT_NOTIFICATION_FAILURE,
  payload: error,
});

export const sendPaymentNotification = (paymentData) => async (dispatch) => {
  dispatch(paymentNotificationRequest());
  try {
    const response = await axios.post('/payment/notification', {
      type: 'payment',
      data: paymentData,
    });
    dispatch(paymentNotificationSuccess(response.data));
  } catch (error) {
    dispatch(paymentNotificationFailure(error));
  }
};

export const sendStripePaymentNotification = (paymentData) => async (dispatch) => {
  dispatch(paymentNotificationRequest());
  try {
    const response = await axios.post('/payment/stripe/webhook', paymentData);
    dispatch(paymentNotificationSuccess(response.data));
  } catch (error) {
    dispatch(paymentNotificationFailure(error));
  }
};
